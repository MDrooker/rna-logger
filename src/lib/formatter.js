import * as utils from './utils';

const sanitise = value => (typeof value === 'string') ? value.replace(/"/g, '\'').replace(/\n/g, '	') : value;
const formatMessage = message => sanitise(message);
const formatFields = (fields = {} = {}) => {
	const formattedFields = Object.keys(fields)
		.map(fieldName => {
			const fieldValue =  fields[fieldName];
			return `${fieldName}=${fieldValue}`;
		});

	return formattedFields.join(' ');
};

const formatter = ({ level, message = '', meta = {}} = {}) => {
	if (level) {
		meta.level = level;
	}
	const formattedMessage = formatMessage(message);
	return [formattedMessage, formatFields(meta)]
		.filter(utils.identity)
		.join(' ');
};

export default formatter;
export { formatFields as fields };