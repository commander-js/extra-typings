const commander = require('commander');
// const { Argument } = require('./lib/argument.js');
// const { Command } = require('./lib/command.js');
// const { CommanderError, InvalidArgumentError } = require('./lib/error.js');
// const { Help } = require('./lib/help.js');
// const { Option } = require('./lib/option.js');


// @ts-check

// Return a different global program than commander, but otherwise same pattern as upstream.

exports = module.exports = new commander.Command();
exports.program = exports; // More explicit access to global command.
// Implicit export of createArgument, createCommand, and createOption.

/**
 * Expose classes. The FooT versions are just types, so return Commander original implementations!
 */

exports.Argument = commander.Argument;
exports.Command = commander.Command;
exports.CommanderError = commander.CommanderError;
exports.Help = commander.Help;
exports.InvalidArgumentError = commander.InvalidArgumentError;
exports.InvalidOptionArgumentError = commander.InvalidArgumentError; // Deprecated
exports.Option = commander.Option;
