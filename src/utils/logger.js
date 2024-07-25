import winston from "winston";
import TransportStream from "winston-transport";


class MyTransport extends TransportStream {
   constructor(option) {
      super(option);
   }

   log(log, next) {
      console.log(`${new Date()} : ${log.level.toUpperCase()} : ${log.message}`);

      next();
   }
}


const logger = winston.createLogger({
   level: "silly",
   transports: [
      new MyTransport({})
   ]
});

export default logger;