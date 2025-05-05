"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080', 10);
const server = (0, app_1.default)({
    logger: { level: 'error' },
});
server
    .listen({ port: PORT, host: '0.0.0.0' })
    .then(address => console.log(`Server listening at ${address}`))
    .catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXlCO0FBSXpCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxtQ0FBSSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFFckQsTUFBTSxNQUFNLEdBQW9CLElBQUEsYUFBSyxFQUFDO0lBQ3BDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Q0FDM0IsQ0FBQyxDQUFBO0FBRUYsTUFBTTtLQUNILE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0tBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkIGZyb20gJy4vYXBwJ1xuaW1wb3J0IHsgRmFzdGlmeUluc3RhbmNlIH0gZnJvbSAnZmFzdGlmeSdcblxuXG5jb25zdCBQT1JUID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCA/PyAnODA4MCcsIDEwKVxuXG5jb25zdCBzZXJ2ZXI6IEZhc3RpZnlJbnN0YW5jZSA9IGJ1aWxkKHtcbiAgbG9nZ2VyOiB7IGxldmVsOiAnZXJyb3InIH0sXG59KVxuXG5zZXJ2ZXJcbiAgLmxpc3Rlbih7IHBvcnQ6IFBPUlQsIGhvc3Q6ICcwLjAuMC4wJyB9KVxuICAudGhlbihhZGRyZXNzID0+IGNvbnNvbGUubG9nKGBTZXJ2ZXIgbGlzdGVuaW5nIGF0ICR7YWRkcmVzc31gKSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgcHJvY2Vzcy5leGl0KDEpXG4gIH0pXG4iXX0=