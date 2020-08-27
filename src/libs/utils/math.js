const getRandomNumber = (max) => (Math.floor(Math.random() * (max)));
const getNextRoundRobin = (current, total) => (current === total - 1 ? 0 : current + 1);

export { getRandomNumber, getNextRoundRobin };
