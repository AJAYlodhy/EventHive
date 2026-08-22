/**
 * EventHive Root Server Entrypoint
 * Delegating to unified backend server supporting Admin, Student, and Organizer modules.
 */
const app = require('./backend/server');

module.exports = app;
