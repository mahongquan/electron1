////////////////////////////////////////////////////////
// Use the cool library                               //
// git://github.com/voodootikigod/node-port.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
var SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort("COM1", {
    baudRate: 1200,
    dataBits: 7,
    parity: 'odd',
    stopBits: 1,
  });
// port.on('open',function() {
//   console.log('Port open');
//   // port.write("ls\r\n", function(err, results) {
//   //   console.log('err ' + err);
//   //   console.log('results ' + results);
//   // });
// });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
parser.on('data', console.log);
