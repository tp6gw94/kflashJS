import struct from "./lib/struct.mjs";
import ISP_PROG from "./lib/isp.js";

const delay = async (sec) => new Promise((r) => setTimeout(r, sec * 1000));

class Port {
  async init() {
    const serial = navigator.serial;
    const filter = { usbVendorId: 6790 };
    this.serialPort = await serial.requestPort({ filters: [filter] });
    //const speed = 1000000
    const speed = 115200 * 1;
    await this.serialPort.open({
      baudRate: speed,
      bufferSize: 1 * 1024 * 1024,
    });
    this.textEncoder = new TextEncoder();
  }

  async changeBaud(speed) {
    await this.close();
    await this.serialPort.open({
      baudRate: speed,
      bufferSize: 1 * 1024 * 1024,
    });
    await this.openReader();
    await this.openWriter();
  }

  async close() {
    this.releaseReader();
    this.releaseWriter();
    await this.serialPort.close();
  }

  async openReader() {
    this.reader = await this.serialPort.readable.getReader();
    return this.reader;
  }

  async releaseReader() {
    this.reader.releaseLock();
  }

  async openWriter() {
    this.writer = await this.serialPort.writable.getWriter();
    return this.writer;
  }

  async releaseWriter() {
    this.writer.releaseLock();
  }

  async writeLine(data) {
    var uint8array = this.textEncoder.encode(data + "\r\n");
    await this.writer.write(uint8array);
  }

  async restart() {
    await this.reader.cancel();
    await this.releaseReader();
    await this.releaseWriter();
    await this.serialPort.setSignals({ dataTerminalReady: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.serialPort.setSignals({ dataTerminalReady: true });
    await this.openReader();
    await this.openWriter();
  }

  readLine(buf) {
    var text = "";
    for (var i = 0; i < buf.length; i++) {
      text += String.fromCharCode(buf[i]);
      if (buf[i] == 0x0a) break;
    }
    text = text.trim();
    buf = buf.subarray(i + 1);
    return { text: text, buf: buf };
  }

  monitorRead(timeout) {
    var self = this;
    setTimeout(function () {
      console.log("monitorRead --> readyToRead:", self.readyToRead);
      if (!self.readyToRead) {
        console.log("read failure !!");
        //self.serialPort.setSignals({ 'break': true });
      }
    }, timeout);
  }

  async readByteArray() {
    this.readyToRead = false;
    //this.monitorRead(timeout);
    //console.log("read len")
    var { value, done } = await this.reader.read();
    var { text, buf } = this.readLine(value);
    var bufSize = parseInt(text);
    var data = new Uint8Array(bufSize);
    //console.log("text:", text, " ,buf:", buf.length,",data:",buf)
    try {
      data.set(buf, 0);
    }
    catch (e) {
      throw "text:" + text + " ,buf:" + buf.length;
    }
    var readSize = buf.length;
    while (readSize < bufSize) {
      //console.log("try to read...")
      await new Promise((r) => setTimeout(r, 20));
      //this.monitorRead(timeout);
      var { value, done } = await this.reader.read();
      data.set(value, readSize);
      readSize += value.length;
      //console.log("progress:", readSize , '/', bufSize)
    }
    this.readyToRead = true;
    return data;
  }

  async setDTR(value) {
    await this.serialPort.setSignals({ dataTerminalReady: value });
  }

  async setRTS(value) {
    await this.serialPort.setSignals({ requestToSend: value });
  }
}

export class FlashModeResponse {
  static Operation = {
    ISP_DEBUG_INFO: 0xd1,
    ISP_NOP: 0xd2,
    ISP_FLASH_ERASE: 0xd3,
    ISP_FLASH_WRITE: 0xd4,
    ISP_REBOOT: 0xd5,
    ISP_UARTHS_BAUDRATE_SET: 0xd6,
    FLASHMODE_FLASH_INIT: 0xd7,
  };

  static ErrorCode = {
    ISP_RET_DEFAULT: 0x00,
    ISP_RET_OK: 0xe0,
    ISP_RET_BAD_DATA_LEN: 0xe1,
    ISP_RET_BAD_DATA_CHECKSUM: 0xe2,
    ISP_RET_INVALID_COMMAND: 0xe3,
    ISP_RET_BAD_INITIALIZATION: 0xe4,
  };

  static parse(data) {
    console.log(
      "FlashModeResponse parse",
      data.map((e) => e.toString(16))
    );
    let op = parseInt(data[0]);
    let reason = parseInt(data[1]);
    let text = "";

    if (op === FlashModeResponse.Operation.ISP_DEBUG_INFO)
      text = String.fromCharCode(...text.slice(2));
    return [op, reason, text];
  }
}

class ISPResponse {
  static ISPOperation = {
    ISP_ECHO: 0xc1,
    ISP_NOP: 0xc2,
    ISP_MEMORY_WRITE: 0xc3,
    ISP_MEMORY_READ: 0xc4,
    ISP_MEMORY_BOOT: 0xc5,
    ISP_DEBUG_INFO: 0xd1,
    ISP_CHANGE_BAUDRATE: 0xc6,
  };

  static ErrorCode = {
    ISP_RET_DEFAULT: 0,
    ISP_RET_OK: 0xe0,
    ISP_RET_BAD_DATA_LEN: 0xe1,
    ISP_RET_BAD_DATA_CHECKSUM: 0xe2,
    ISP_RET_INVALID_COMMAND: 0xe3,
  };

  static parse(data) {
    // console.log("ISPResponse parse", data);
    let op = parseInt(data[0]);
    let reason = parseInt(data[1]);
    let text = "";

    try {
      for (let code in ISPResponse.ISPOperation) {
        if (
          ISPResponse.ISPOperation[code] === op &&
          ISPResponse.ISPOperation.ISP_DEBUG_INFO
        )
          text = String.fromCharCode(...text.slice(2));
      }
    }
    catch (e) {
      console.log(e);
    }

    return [op, reason, text];
  }
}

class KFlash {
  async requestSerialPort() {
    this.port = new Port();
    await this.port.init();
    await this.port.openReader();
    await this.port.openWriter();
  }

  async reboot() {
    await this.port.setDTR(0);
    await this.port.setRTS(0);
    await delay(0.1);

    // console.log('-- RESET to LOW --')
    // Pull reset down and keep 10ms
    await this.port.setDTR(0);
    await this.port.setRTS(1);
    await delay(0.1);

    // console.log('-- RESET to HIGH, BOOT --')
    // Pull IO16 to low and release reset
    await this.port.setRTS(0);
    await this.port.setDTR(0);
    await delay(0.1);
    console.log('reboot')
  }

  async init_write() {
    const _port = this.port;
    const ISP_RECEIVE_TIMEOUT = 0.5;
    const MAX_RETRY_TIMES = 10;
    const ISP_FLASH_SECTOR_SIZE = 4096;
    const ISP_FLASH_DATA_FRAME_SIZE = ISP_FLASH_SECTOR_SIZE * 16;
    const isp_bytearray = ISP_PROG.match(/.{1,2}/g).map((e) => parseInt(e, 16));
    const isp_compressed = pako.inflate(new Uint8Array(isp_bytearray));

    class MAIXLoader {
      async write(packet) {
        let handlePacket = [];

        packet.forEach((e) => {
          if (e === 0xc0) handlePacket.push(0xdb, 0xdc);
          else if (e === 0xdb) handlePacket.push(0xdb, 0xdd);
          else handlePacket.push(e);
        });

        // console.log([0xc0, ...handlePacket, 0xc0].map((e) => e.toString(16)));
        // console.log([0xc0, ...handlePacket, 0xc0].length);
        const uint8 = new Uint8Array([0xc0, ...handlePacket, 0xc0]);
        await _port.writer.write(uint8);
        console.log('wirte end');
      }

      async reset_to_isp() {
        console.log('reset to isp');
        await _port.setDTR(0);
        await _port.setRTS(0);
        await delay(0.1);

        // console.log('-- RESET to LOW, IO16 to HIGH --')
        // Pull reset down and keep 10ms
        await _port.setDTR(0);
        await _port.setRTS(1);
        await delay(0.1);

        // console.log('-- IO16 to LOW, RESET to HIGH --')
        // Pull IO16 to low and release reset
        await _port.setDTR(1);
        await _port.setRTS(0);
        await delay(0.1);
      }

      async reset_to_boot() {
        await _port.setDTR(0);
        await _port.setRTS(0);
        await delay(0.1);

        // console.log('-- RESET to LOW --')
        // Pull reset down and keep 10ms
        await _port.setDTR(0);
        await _port.setRTS(1);
        await delay(0.1);

        // console.log('-- RESET to HIGH, BOOT --')
        // Pull IO16 to low and release reset
        await _port.setRTS(0);
        await _port.setDTR(0);
        await delay(0.1);
      }

      async recv_one_return() {
        const timeout_init = Date.now() / 1000;
        delay(0.1);

        while (true) {
          if (Date.now / 1000 - timeout_init > ISP_RECEIVE_TIMEOUT) {
            console.log('timeout')
            return 'timeout';
            break;
          }

          const resp = await Promise.race([_port.reader.read(), new Promise(resolve => setTimeout(() => resolve(
            'timeout'), 1000 * 10))]);
          if (resp === 'timeout') {
            console.log('read stream timeout')
            return 'timeout';
            break;
          }

          const { value, done } = resp;
          const buf = Array.from(value);

          let data = [];
          let in_escape = false;
          let start = false;
          let i = 0;

          // Serial Line Internet Protocol
          while (i < buf.length) {
            const c = buf[i++];

            if (c === 0xc0) {
              buf.slice(i, buf.length);
              start = true;
              break;
            }
          }

          if (!start) continue;

          i = 0;

          while (i < buf.length) {
            const c = buf[++i];

            if (c === 0xc0) break;
            else if (in_escape) {
              in_escape = true;
              if (c === 0xdc) data.push(0xc0);
              else if (c === 0xdd) data.push(0xdb);
              else throw "Invalid SLIP escape";
            } else if (c === 0xdb) in_escape = true;

            data.push(c);
          }

          // console.log(
          //   data.map((e) => `0x${e.toString(16)}`),
          //   done
          // );
          return data;
        }
      }

      async recv_debug() {
        const resp = await this.recv_one_return();
        if (resp === 'timeout') return 'timeout';
        const result = ISPResponse.parse(resp);
        const op = result[0];
        const reason = result[1];
        const text = result[2];
        if (text) {
          console.log("---");
          console.log(text);
          console.log("---");
        }
        // console.log(op.toString(16), reason.toString(16), text);
        if (
          reason !== ISPResponse.ErrorCode.ISP_RET_DEFAULT &&
          reason !== ISPResponse.ErrorCode.ISP_RET_OK
        ) {
          console.log(`Failed, retry, errcode= 0x${reason.toString(16)}`);
          return false;
        }
        return true;
      }

      async greeting() {
        console.log("greeting....");
        await _port.writer.write(
          new Uint8Array([
            0xc0, 0xc2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0xc0,
          ])
        );
        ISPResponse.parse(await this.recv_one_return());
        console.log('greeting end');
      }

      async flash_greeting() {
        console.log('flash_greeting');
        retry_count = 0;
        while (true) {
          await _port.writer.write(
            new Uint8Array([
              0xc0, 0xd2, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0xc0,
            ])
          );
          retry_count++;

          let op = 0;
          let reason = 0;
          let text = "";

          try {
            const result = FlashModeResponse.parse(
              await this.recv_one_return()
            );
            op = result[0];
            reason = result[1];
            text = result[2];
          }
          catch (e) {
            console.log("Failed to Connect to K210's Stub");
            await delay(0.1);
            continue;
          }

          if (
            op === FlashModeResponse.Operation.ISP_NOP &&
            reason === FlashModeResponse.ErrorCode.ISP_RET_OK
          ) {
            console.log("Boot to Flashmode Successful");
            // TODO: flush buffer
            break;
          } else {
            if (retry_count > MAX_RETRY_TIMES) {
              console.log("Failed to Connect to K210's Stub");
              throw "FlashStubError";
            }
            console.log("Unexpecpted Return recevied, retrying...");
            await delay(0.1);
          }
        }
      }

      async flash_dataframe(data, address = 0x80000000) {
        const DATAFRAME_SIZE = 1024;
        data = Array.from(data);

        while (data.length) {
          const chunk = data.splice(0, DATAFRAME_SIZE);
          while (true) {
            const op_p = new Uint8Array(
              struct("<HH").pack(
                ISPResponse.ISPOperation.ISP_MEMORY_WRITE,
                0x00
              )
            );
            const address_p = new Uint8Array(
              struct("<II").pack(address, chunk.length)
            );

            const crc32_checksum = new Uint8Array(
              struct("<I").pack(
                crc.crc32([...address_p, ...chunk]) & 0xffffffff
              )
            );

            let packet = [...op_p, ...crc32_checksum, ...address_p, ...chunk];
            // console.log(packet);
            // console.log(packet.map((e) => e.toString(16)));
            console.log("write", `0x${address.toString(16)}`, packet.length);
            await this.write(packet);
            const resp = await this.recv_debug();
            if (resp === 'timeout') {
              return 'timeout';
            }
            if (resp) {
              address += DATAFRAME_SIZE;
              break;
            }
          }
        }
        console.log(`Downlaod ISP OK`);
      }

      async install_flash_bootloader(data) {
        return await this.flash_dataframe(data, 0x80000000);
      }

      async change_baudrate(baudrate = 2000000) {
        console.log("Selected Baudrate:", baudrate);
        const baudrate_p = new Uint8Array(struct("<III").pack(0, 4, baudrate));
        const crc32_checksum = new Uint8Array(
          struct("<I").pack(crc.crc32(baudrate_p) & 0xffffffff)
        );
        const op_p = new Uint8Array(
          struct("<HH").pack(
            FlashModeResponse.Operation.ISP_UARTHS_BAUDRATE_SET,
            0x00
          )
        );
        const packet = [...op_p, ...crc32_checksum, ...baudrate_p];

        await this.write(packet);

        await delay(0.05);
        await _port.changeBaud(baudrate);
        console.log('changeBaud end')
      }

      async boot(address = 0x80000000) {
        console.log("Booting From", `0x${address.toString(16)}`);

        const address_p = new Uint8Array(struct("<II").pack(address, 0));
        const crc32_checksum = new Uint8Array(
          struct("<I").pack(crc.crc32(address_p) & 0xffffffff)
        );
        const op_p = new Uint8Array(
          struct("<HH").pack(ISPResponse.ISPOperation.ISP_MEMORY_BOOT, 0x00)
        );
        const packet = new Uint8Array([
          ...op_p,
          ...crc32_checksum,
          ...address_p,
        ]);
        console.log(packet, packet.length);
        await this.write(packet);
      }

      async init_flash(chip_type = 1) {
        const chip_type_p = new Uint8Array(struct("<II").pack(chip_type, 0));
        const crc32_checksum = new Uint8Array(
          struct("<I").pack(crc.crc32(chip_type_p) & 0xffffffff)
        );
        const op_p = new Uint8Array(
          struct("<HH").pack(
            FlashModeResponse.Operation.FLASHMODE_FLASH_INIT,
            0x0
          )
        );
        const packet = [...op_p, ...crc32_checksum, ...chip_type_p];
        let retry_count = 0;
        let op = 0;
        let reason = 0;

        while (true) {
          await this.write(packet);
          retry_count++;
          try {
            const result = FlashModeResponse.parse(
              await this.recv_one_return()
            );
            op = result[0];
            reason = result[1];
          }
          catch (e) {
            // console.log("Failed to initialize flash");
            throw "InitalizeFlashError";
            continue;
          }

          if (
            op === FlashModeResponse.Operation.FLASHMODE_FLASH_INIT &&
            reason === FlashModeResponse.ErrorCode.ISP_RET_OK
          ) {
            console.log("Initialization flash Successfully");
            break;
          } else {
            if (retry_count > MAX_RETRY_TIMES) {
              console.log("Failed to initialize flash");
              throw "InitialFlashError";
            }
            console.log("Unexcepted Return recevied, retrying...");
            await delay(0.1);
          }
        }
      }

      async flash_firmware(packet) {
        await this.write(packet);
        const debug_msg = await this.recv_debug();
        if (debug_msg === 'timeout') return false;
        return debug_msg;
      }
    }

    // init
    this.loader = new MAIXLoader();
    console.log('change_baudrate 115200')
    await this.loader.change_baudrate(115200);

    // 1. Greeting
    console.log("Trying to Enter the ISP Mode...");
    let retry_count = 0;
    while (true) {
      try {
        retry_count += 1;
        if (retry_count > 15) {
          console.log(
            "[ERROR]",
            "No vaild Kendryte K210 found in Auto Detect, Check Your Connection or Specify One by"
          );
        }
        try {
          console.log(".");
          await this.loader.reset_to_isp();
          await this.loader.greeting();
          break;
        }
        catch {
          console.log("timeouterror");
        }
      }
      catch {
        console.log("Greeting fail, check serial port");
      }
    }

    // 2. download bootloader and firmware
    console.log("download bootloader and firmware");
    const resp = await this.loader.install_flash_bootloader(isp_compressed);
    if (resp === 'timeout') return 'timeout';

    // Boot the code from SRAM
    await this.loader.boot();

    console.log("Wait For 0.1 second for ISP to Boot");
    await delay(0.1);

    console.log("flash_greeting");
    await this.loader.flash_greeting();

    console.log("change_baudrate 2000000");
    await this.loader.change_baudrate();
    console.log("flash_greeting");
    await this.loader.flash_greeting();
    console.log("init_flash");
    await this.loader.init_flash();

    return this.loader;

    // console.log("flash_firmware");
    // await this.loader.flash_firmware(blob);
    //
    //
    // // 3. boot
    // await this.loader.reset_to_boot();
    // console.log("Rebooting...");
  }
}

class WebAI {
  async requestSerialPort() {
    this.port = new Port();
    await this.port.init();
    await this.port.openReader();
    await this.port.openWriter();
  }

  async restart() {
    await this.port.restart();
    //*/
    await new Promise((r) => setTimeout(r, 3200));
    var w = await this.port.serialPort.writable.getWriter();
    var ctrl_C = new Uint8Array([0x03]);
    for (var i = 0; i < 10; i++) {
      console.log("ctrl+c", i);
      await w.write(ctrl_C);
      console.log("ctrl+c...ok");
      await new Promise((r) => setTimeout(r, 100));
    }
    w.releaseLock();
    await this.port.initIO();
    //*
    await this.cmd("import lcd");
    await this.cmd("lcd.init()");
    await this.cmd('lcd.draw_string(50,100,"USB connect successful.")');
    //*/
  }

  async exec(code) {
    //console.log(">>>", code, code.length)
    await this.port.writeLine("execREPL");
    await this.port.writeLine(code.length);
    await this.port.writeLine(code);
    // wait for data comming

    var rtnInfo = "";
    do {
      await new Promise((resolve) => setTimeout(resolve, 100));
      var { value, done } = await this.port.reader.read();
      var buf = value;
      do {
        var { text, buf } = this.port.readLine(buf);
        rtnInfo = rtnInfo + text + "\r\n";
      }
      while (buf.length > 0);
    }
    while (rtnInfo.indexOf("_REPL_OK_") == -1);
    rtnInfo = rtnInfo.replace("_REPL_OK_", "").trim();
    await new Promise((resolve) => setTimeout(resolve, 100));
    return rtnInfo;
  }

  async cmd(cmd) {
    cmd = cmd + "\r\n";
    await this.port.writer.write(cmd);
    var { value, done } = await this.port.reader.read();
    var { text, buf } = this.port.readLine(value);
    console.log("resp:", text);
    return text;
  }

  async readBreak() {
    await this.port.serialPort.setSignals({ break: true });
  }

  async readyToRead() {
    return this.port.serialPort.readyToRead;
  }

  async cmd_clear() {
    do {
      await this.port.writeLine("clear");
      var { value, done } = await this.port.reader.read();
      var { text, buf } = this.port.readLine(value);
    }
    while (text != "cmd_clear OK");
    return text;
  }

  async cmd_mem() {
    await this.port.writeLine("mem");
    // wait for data comming
    await new Promise((resolve) => setTimeout(resolve, 100));
    var { value, done } = await this.port.reader.read();
    var memInfo = "";
    do {
      var { text, buf } = this.port.readLine(value);
      memInfo += text + "\r\n";
    }
    while (buf.length > 0);
    return memInfo;
  }

  async cmd_deviceID() {
    await this.port.writeLine("deviceID");
    var { value, done } = await this.port.reader.read();
    var { text, buf } = this.port.readLine(value);
    return text;
  }

  async cmd_ota() {
    await this.port.writeLine("ota");
    var { value, done } = await this.port.reader.read();
    var { text, buf } = this.port.readLine(value);
    return text;
  }

  async cmd_snapshot() {
    var imgData = new Uint8Array(0);
    await this.port.writeLine("snapshot");
    var value = await this.port.readByteArray();
    return new Blob([value], { type: "image/jpeg" });
  }

  async cmd_flashRead(addr, size) {
    await this.port.writeLine("flashRead");
    await this.port.writeLine(addr + "," + size);
    return await this.port.readByteArray();
  }

  async cmd_flashWrite(addr, data) {
    await this.port.writeLine("flashWrite");
    await this.port.writeLine(addr + "," + data.length);
    await this.port.writer.write(data);
    var { value, done } = await this.port.reader.read();
    return new TextDecoder().decode(value);
  }
}

const kflash = new KFlash();

export default kflash;
// webai = new WebAI();
