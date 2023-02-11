import winston from 'winston';
import Logger from './logger.js';

class AppLogger extends Logger {
	constructor(deps = {}) {
		super(deps);
		Object.assign(this.deps, { winston }, deps);
		this.logger = winston.createLogger({
			transports: [
				new (this.deps.winston.transports.Console)({
					colorize: this.deps.colorize,
					level: this.deps.level,
					json: this.deps.json,
					stringify: true
				})
			]
		});
	}

	doLog(...args) {
		this.logger.log.apply(this.logger, args);
	}

	addConsole(level = 'info', colorize = true, opts = {}) {
		if (this.logger.transports.console) {
			return;
		}
		this.logger.add(
			this.deps.winston.transports.Console,
			Object.assign({ level, formatter: this.deps.formatter, colorize }, opts)
		);
	}
	addLogger(incomingLogger, level = 'info', opts = {}) {
		this.logger.add(
			incomingLogger,
			Object.assign({ level }, opts)
		);
	}

	removeConsole() {
		if (!this.logger.transports.console) {
			return;
		}
		this.logger.remove('console');
	}

	clearLoggers() {
		Object.keys(this.logger.transports)
			.forEach(logger => this.logger.remove(logger));
	}

}

export default AppLogger;
