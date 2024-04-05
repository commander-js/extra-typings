import * as commander from '../index';
import { expectType, expectAssignable } from 'tsd';

// This is a copy of the TypeScript tests in Commander to see
// what changes are required, and find out what breaks in a wide
// range of usage examples.

// Search for "breaking change" to find tests that were commented out due to changed behaviour.
// In addition, all of the chaining tests on Command changed to use expectChainedCommand so
// can change as needed, and weaker test that extends CommandUnknownOpts doesn't fail due to
// generic typing of options and arguments.

function expectChainedCommand<T extends commander.CommandUnknownOpts>(cmd: T) {
}

// We are are not just checking return types here, we are also implicitly checking that the expected syntax is allowed.

/* eslint-disable @typescript-eslint/no-empty-function */

const program: commander.Command = new commander.Command();
// @ts-expect-error Check that Command is strongly typed and does not allow arbitrary properties
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
program.silly; // <-- Error, hurrah!

// Check for exported global Command object
expectType<commander.Command>(commander.program);

// Check export classes and functions exist
expectType<commander.Command>(new commander.Command());
expectType<commander.Command>(new commander.Command('name'));
expectType<commander.Option>(new commander.Option('-f'));
expectType<commander.CommanderError>(new commander.CommanderError(1, 'code', 'message'));
expectType<commander.InvalidArgumentError>(new commander.InvalidArgumentError('message'));
expectType<commander.InvalidArgumentError>(new commander.InvalidOptionArgumentError('message'));
expectType<commander.Command>(commander.createCommand());
expectType<commander.Option>(commander.createOption('--demo'));
expectType<commander.Argument>(commander.createArgument('<foo>'));

// Command properties
expectType<string[]>(program.args);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectType<[]>(program.processedArgs);
expectType<readonly commander.CommandUnknownOpts[]>(program.commands);
expectType<readonly commander.Option[]>(program.options);
expectType<readonly commander.Argument[]>(program.registeredArguments);
expectType<commander.CommandUnknownOpts | null>(program.parent);

// version
expectChainedCommand(program.version('1.2.3'));
expectChainedCommand(program.version('1.2.3', '-r,--revision'));
expectChainedCommand(program.version('1.2.3', '-r,--revision', 'show revision information'));
expectType<string | undefined>(program.version());

// command (and CommandOptions)
expectChainedCommand(program.command('action'));
expectChainedCommand(program.command('action', { isDefault: true, hidden: true, noHelp: true }));
expectType<commander.Command>(program.command('exec', 'exec description'));
expectType<commander.Command>(program.command('exec', 'exec description', { isDefault: true, hidden: true, noHelp: true, executableFile: 'foo' }));

// addCommand
expectChainedCommand(program.addCommand(new commander.Command('abc')));

// argument
expectChainedCommand(program.argument('<value>'));
expectChainedCommand(program.argument('<value>'));
expectChainedCommand(program.argument('<value>', 'description'));
expectChainedCommand(program.argument('[value]', 'description', 'default'));
expectChainedCommand(program.argument('[value]', 'description', parseFloat));
expectChainedCommand(program.argument('[value]', 'description', parseFloat, 1.23));

// arguments
expectChainedCommand(program.arguments('<cmd> [env]'));

// addHelpCommand
expectType<commander.Command>(program.addHelpCommand(new commander.Command('assist')));
// Deprecated uses
expectType<commander.Command>(program.addHelpCommand());
expectType<commander.Command>(program.addHelpCommand(false));
expectType<commander.Command>(program.addHelpCommand(true));
expectType<commander.Command>(program.addHelpCommand('assist [cmd]'));
expectType<commander.Command>(program.addHelpCommand('assist [file]', 'display help'));

// helpCommand
expectType<commander.Command>(program.helpCommand(false));
expectType<commander.Command>(program.helpCommand(true));
expectType<commander.Command>(program.helpCommand('assist [cmd]'));
expectType<commander.Command>(program.helpCommand('assist [file]', 'display help'));

// exitOverride
expectChainedCommand(program.exitOverride());
expectChainedCommand(program.exitOverride((err): never => {
  return process.exit(err.exitCode);
}));
expectChainedCommand(program.exitOverride((err): void => {
  if (err.code !== 'commander.executeSubCommandAsync') {
    throw err;
  } else {
    // Async callback from spawn events, not useful to throw.
  }
}));

// error
expectType<never>(program.error('Goodbye'));
expectType<never>(program.error('Goodbye', { code: 'my.error' }));
expectType<never>(program.error('Goodbye', { exitCode: 2 }));
expectType<never>(program.error('Goodbye', { code: 'my.error', exitCode: 2 }));

// hook
expectChainedCommand(program.hook('preAction', () => {}));
expectChainedCommand(program.hook('postAction', () => {}));
expectChainedCommand(program.hook('preAction', async() => {}));
expectChainedCommand(program.hook('preAction', (thisCommand, actionCommand) => {
  // implicit parameter types
  expectType<typeof program>(thisCommand);
  expectType<commander.CommandUnknownOpts>(actionCommand);
}));
expectChainedCommand(program.hook('preSubcommand', () => {}));
expectChainedCommand(program.hook('preSubcommand', (thisCommand, subcommand) => {
  // implicit parameter types
  expectType<typeof program>(thisCommand);
  expectType<commander.CommandUnknownOpts>(subcommand);
}));

// action
expectChainedCommand(program.action(() => {}));
expectChainedCommand(program.action(async() => {}));

// option
expectChainedCommand(program.option('-a,--alpha'));
expectChainedCommand(program.option('-p, --peppers', 'Add peppers'));
expectChainedCommand(program.option('-s, --string [value]', 'default string', 'value'));
expectChainedCommand(program.option('-b, --boolean', 'default boolean', false));
// Breaking change: drop support for regular expression
// expectChainedCommand(program.option('--drink <size', 'drink size', /small|medium|large/)); // deprecated

// example coercion functions from README

function myParseInt(value: string): number {
  return parseInt(value);
}

function increaseVerbosity(dummyValue: string, previous: number): number {
  return previous + 1;
}

function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

function commaSeparatedList(value: string): string[] {
  return value.split(',');
}

expectChainedCommand(program.option('-f, --float <number>', 'float argument', parseFloat));
expectChainedCommand(program.option('-f, --float <number>', 'float argument', parseFloat, 3.2));
expectChainedCommand(program.option('-i, --integer <number>', 'integer argument', myParseInt));
expectChainedCommand(program.option('-i, --integer <number>', 'integer argument', myParseInt, 5));
expectChainedCommand(program.option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0));
expectChainedCommand(program.option('-c, --collect <value>', 'repeatable value', collect, []));
expectChainedCommand(program.option('-l, --list <items>', 'comma separated list', commaSeparatedList));

// requiredOption, same tests as option
expectChainedCommand(program.requiredOption('-a,--alpha'));
expectChainedCommand(program.requiredOption('-p, --peppers', 'Add peppers'));
expectChainedCommand(program.requiredOption('-s, --string [value]', 'default string', 'value'));
expectChainedCommand(program.requiredOption('-b, --boolean', 'default boolean', false));
// Breaking change: drop support for regular expression
// expectChainedCommand(program.requiredOption('--drink <size', 'drink size', /small|medium|large/)); // deprecated

expectChainedCommand(program.requiredOption('-f, --float <number>', 'float argument', parseFloat));
expectChainedCommand(program.requiredOption('-f, --float <number>', 'float argument', parseFloat, 3.2));
expectChainedCommand(program.requiredOption('-i, --integer <number>', 'integer argument', myParseInt));
expectChainedCommand(program.requiredOption('-i, --integer <number>', 'integer argument', myParseInt, 5));
expectChainedCommand(program.requiredOption('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0));
expectChainedCommand(program.requiredOption('-c, --collect <value>', 'repeatable value', collect, []));
expectChainedCommand(program.requiredOption('-l, --list <items>', 'comma separated list', commaSeparatedList));

// createOption
expectType<commander.Option>(program.createOption('a, --alpha'));
expectType<commander.Option>(program.createOption('a, --alpha', 'description'));

// addOption
expectChainedCommand(program.addOption(new commander.Option('-s,--simple')));

// storeOptionsAsProperties
expectType<commander.Command & commander.OptionValues>(program.storeOptionsAsProperties());
expectType<commander.Command & commander.OptionValues>(program.storeOptionsAsProperties(true));
expectChainedCommand(program.storeOptionsAsProperties(false));

// getOptionValue
void program.getOptionValue('example');

// setOptionValue
expectChainedCommand(program.setOptionValue('example', 'value'));
expectChainedCommand(program.setOptionValue('example', true));

// setOptionValueWithSource
expectChainedCommand(program.setOptionValueWithSource('example', [], 'cli'));

// getOptionValueSource
expectType<commander.OptionValueSource | undefined>(program.getOptionValueSource('example'));

// getOptionValueSourceWithGlobals
expectType<commander.OptionValueSource | undefined>(program.getOptionValueSourceWithGlobals('example'));

// combineFlagAndOptionalValue
expectChainedCommand(program.combineFlagAndOptionalValue());
expectChainedCommand(program.combineFlagAndOptionalValue(false));

// allowUnknownOption
expectChainedCommand(program.allowUnknownOption());
expectChainedCommand(program.allowUnknownOption(false));

// allowExcessArguments
expectChainedCommand(program.allowExcessArguments());
expectChainedCommand(program.allowExcessArguments(false));

// enablePositionalOptions
expectChainedCommand(program.enablePositionalOptions());
expectChainedCommand(program.enablePositionalOptions(false));

// passThroughOptions
expectChainedCommand(program.passThroughOptions());
expectChainedCommand(program.passThroughOptions(false));

// parse
expectChainedCommand(program.parse());
expectChainedCommand(program.parse(process.argv));
expectChainedCommand(program.parse(['node', 'script.js'], { from: 'node' }));
expectChainedCommand(program.parse(['node', 'script.js'], { from: 'electron' }));
expectChainedCommand(program.parse(['--option'], { from: 'user' }));
expectChainedCommand(program.parse(['node', 'script.js'] as const));

// parseAsync, same tests as parse
expectType<Promise<commander.Command>>(program.parseAsync());
expectType<Promise<commander.Command>>(program.parseAsync(process.argv));
expectType<Promise<commander.Command>>(program.parseAsync(['node', 'script.js'], { from: 'node' }));
expectType<Promise<commander.Command>>(program.parseAsync(['node', 'script.js'], { from: 'electron' }));
expectType<Promise<commander.Command>>(program.parseAsync(['--option'], { from: 'user' }));
expectType<Promise<commander.Command>>(program.parseAsync(['node', 'script.js'] as const));

// parseOptions (and ParseOptionsResult)
expectType<{operands: string[]; unknown: string[]}>(program.parseOptions(['node', 'script.js', 'hello']));

// opts
const opts = program.opts();
expectAssignable<commander.OptionValues>(opts);
// Breaking change: unknown  properties are now an error
// expectType(opts.foo);
// expectType(opts.bar);

// opts with generics
// Breaking change: user supplied type no longer supported this way
// interface MyCheeseOption {
//   cheese: string;
// }
// const myCheeseOption = program.opts<MyCheeseOption>();
// expectType<string>(myCheeseOption.cheese);
// // @ts-expect-error Check that options strongly typed and does not allow arbitrary properties
// expectType(myCheeseOption.foo);

// optsWithGlobals
const optsWithGlobals = program.optsWithGlobals();
expectType<commander.OptionValues>(optsWithGlobals);
expectType(optsWithGlobals.foo);
expectType(optsWithGlobals.bar);

// optsWithGlobals with generics
// Breaking change: user supplied type no longer supported this way
// const myCheeseOptionWithGlobals = program.optsWithGlobals<MyCheeseOption>();
// expectType<string>(myCheeseOptionWithGlobals.cheese);
// // @ts-expect-error Check that options strongly typed and does not allow arbitrary properties
// expectType(myCheeseOptionWithGlobals.foo);

// description
expectChainedCommand(program.description('my description'));
expectType<string>(program.description());
expectChainedCommand(program.description('my description of command with arg foo', { foo: 'foo description' })); // deprecated

// summary
expectChainedCommand(program.summary('my summary'));
expectType<string>(program.summary());

// alias
expectChainedCommand(program.alias('my alias'));
expectType<string>(program.alias());

// aliases
expectChainedCommand(program.aliases(['first-alias', 'second-alias']));
expectChainedCommand(program.aliases(['first-alias', 'second-alias'] as const));
expectType<string[]>(program.aliases());

// usage
expectChainedCommand(program.usage('my usage'));
expectType<string>(program.usage());

// name
expectChainedCommand(program.name('my-name'));
expectType<string>(program.name());

// nameFromFilename
expectChainedCommand(program.nameFromFilename(__filename));

// executableDir
expectChainedCommand(program.executableDir(__dirname));
expectType<string | null>(program.executableDir());

// outputHelp
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
expectType<void>(program.outputHelp());
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
expectType<void>(program.outputHelp((str: string) => { return str; }));
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
expectType<void>(program.outputHelp({ error: true }));

// help
expectType<never>(program.help());
expectType<never>(program.help((str: string) => { return str; }));
expectType<never>(program.help({ error: true }));

// helpInformation
expectType<string>(program.helpInformation());
expectType<string>(program.helpInformation({ error: true }));

// helpOption
expectChainedCommand(program.helpOption('-h,--help'));
expectChainedCommand(program.helpOption('-h,--help', 'custom description'));
expectChainedCommand(program.helpOption(undefined, 'custom description'));
expectChainedCommand(program.helpOption(false));

// addHelpOption
expectType<commander.Command>(program.addHelpOption(new commander.Option('-h,--help')));

// addHelpText
expectChainedCommand(program.addHelpText('after', 'text'));
expectChainedCommand(program.addHelpText('afterAll', 'text'));
expectChainedCommand(program.addHelpText('before', () => 'before'));
expectChainedCommand(program.addHelpText('beforeAll', (context) => {
  expectType<boolean>(context.error);
  expectType<commander.Command>(context.command);
  return '';
}));

// on
expectChainedCommand(program.on('command:foo', () => {}));

// createCommand
expectType<commander.Command>(program.createCommand());
expectType<commander.Command>(program.createCommand('name'));

class MyCommand extends commander.Command {
  createCommand(name?: string): MyCommand {
    return new MyCommand(name);
  }

  myFunction(): void {
    // do nothing.
  }
}
const myProgram = new MyCommand();
// Breaking change: not getting back subclass type
// expectType<MyCommand>(myProgram.command('sub'));

// configureHelp
expectType<commander.Help>(program.createHelp());
expectChainedCommand(program.configureHelp({
  sortSubcommands: true, // override property
  visibleCommands: () => [] // override method
}));
expectType<commander.HelpConfiguration>(program.configureHelp());

// copyInheritedSettings
expectChainedCommand(program.copyInheritedSettings(new commander.Command()));

// showHelpAfterError
expectChainedCommand(program.showHelpAfterError());
expectChainedCommand(program.showHelpAfterError(true));
expectChainedCommand(program.showHelpAfterError('See --help'));

// showSuggestionAfterError
expectChainedCommand(program.showSuggestionAfterError());
expectChainedCommand(program.showSuggestionAfterError(false));

// configureOutput
expectChainedCommand(program.configureOutput({ }));
expectType<commander.OutputConfiguration>(program.configureOutput());

expectChainedCommand(program.configureOutput({
  writeOut: (str: string) => console.log(str),
  writeErr: (str: string) => console.error(str),
  getOutHelpWidth: () => 80,
  getErrHelpWidth: () => 80,
  outputError: (str: string, write: (str: string) => void) => { write(str); }
}));

// Help
const helper = new commander.Help();
const helperCommand = new commander.Command();
const helperOption = new commander.Option('-a, --all');
const helperArgument = new commander.Argument('<file>');

expectType<number | undefined>(helper.helpWidth);
expectType<boolean>(helper.sortSubcommands);
expectType<boolean>(helper.sortOptions);
expectType<boolean>(helper.showGlobalOptions);

expectType<string>(helper.subcommandTerm(helperCommand));
expectType<string>(helper.commandUsage(helperCommand));
expectType<string>(helper.commandDescription(helperCommand));
expectType<string>(helper.subcommandDescription(helperCommand));
expectType<string>(helper.optionTerm(helperOption));
expectType<string>(helper.optionDescription(helperOption));
expectType<string>(helper.argumentTerm(helperArgument));
expectType<string>(helper.argumentDescription(helperArgument));

expectType<commander.CommandUnknownOpts[]>(helper.visibleCommands(helperCommand));
expectType<commander.Option[]>(helper.visibleOptions(helperCommand));
expectType<commander.Option[]>(helper.visibleGlobalOptions(helperCommand));
expectType<commander.Argument[]>(helper.visibleArguments(helperCommand));

expectType<number>(helper.longestSubcommandTermLength(helperCommand, helper));
expectType<number>(helper.longestOptionTermLength(helperCommand, helper));
expectType<number>(helper.longestGlobalOptionTermLength(helperCommand, helper));
expectType<number>(helper.longestArgumentTermLength(helperCommand, helper));
expectType<number>(helper.padWidth(helperCommand, helper));

expectType<string>(helper.wrap('a b c', 50, 3));

expectType<string>(helper.formatHelp(helperCommand, helper));

// Option properties

const baseOption = new commander.Option('-f,--foo', 'foo description');
expectType<string>(baseOption.flags);
expectType<string>(baseOption.description);
expectType<boolean>(baseOption.required);
expectType<boolean>(baseOption.optional);
expectType<boolean>(baseOption.variadic);
expectType<boolean>(baseOption.mandatory);
expectType<string | undefined>(baseOption.short);
expectType<string | undefined>(baseOption.long);
expectType<boolean>(baseOption.negate);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectType<any>(baseOption.defaultValue);
expectType<string | undefined>(baseOption.defaultValueDescription);
expectType<unknown>(baseOption.presetArg);
expectType<string | undefined>(baseOption.envVar);
expectType<boolean>(baseOption.hidden);
expectType<string[] | undefined>(baseOption.argChoices);

// Option methods

// default
expectType<commander.Option>(baseOption.default(3));
expectType<commander.Option>(baseOption.default(60, 'one minute'));

// preset
expectType<commander.Option>(baseOption.preset(123));
expectType<commander.Option>(baseOption.preset('abc'));

// env
expectType<commander.Option>(baseOption.env('PORT'));

// fullDescription
expectType<string>(baseOption.fullDescription());

// argParser
expectType<commander.Option>(baseOption.argParser((value: string) => parseInt(value)));
expectType<commander.Option>(baseOption.argParser((value: string, previous: string[]) => { return previous.concat(value); }));

// makeOptionMandatory
expectType<commander.Option>(baseOption.makeOptionMandatory());
expectType<commander.Option>(baseOption.makeOptionMandatory(true));

// hideHelp
expectType<commander.Option>(baseOption.hideHelp());
expectType<commander.Option>(baseOption.hideHelp(true));
expectType<commander.Option>(baseOption.hideHelp(false));

// choices
expectType<commander.Option>(baseOption.choices(['a', 'b']));
expectType<commander.Option>(baseOption.choices(['a', 'b'] as const));

// conflicts
expectType<commander.Option>(baseOption.conflicts('a'));
expectType<commander.Option>(baseOption.conflicts(['a', 'b']));

// implies
expectType<commander.Option>(baseOption.implies({ option: 'VALUE', colour: false }));

// name
expectType<string>(baseOption.name());

// attributeName
expectType<string>(baseOption.attributeName());

// isBoolean
expectType<boolean>(baseOption.isBoolean());

// Argument properties
const baseArgument = new commander.Argument('<foo');
expectType<string>(baseArgument.description);
expectType<boolean>(baseArgument.required);
expectType<boolean>(baseArgument.variadic);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
expectType<any>(baseArgument.defaultValue);
expectType<string | undefined>(baseArgument.defaultValueDescription);
expectType<string[] | undefined>(baseArgument.argChoices);

// Argument methods

// name
expectType<string>(baseArgument.name());

// default
expectType<commander.Argument>(baseArgument.default(3));
expectType<commander.Argument>(baseArgument.default(60, 'one minute'));

// argParser
expectType<commander.Argument>(baseArgument.argParser((value: string) => parseInt(value)));
expectType<commander.Argument>(baseArgument.argParser((value: string, previous: string[]) => { return previous.concat(value); }));

// choices
expectType<commander.Argument>(baseArgument.choices(['a', 'b']));
expectType<commander.Argument>(baseArgument.choices(['a', 'b'] as const));

// argRequired
expectType<commander.Argument>(baseArgument.argRequired());

// argOptional
expectType<commander.Argument>(baseArgument.argOptional());

// createArgument
expectType<commander.Argument>(program.createArgument('<name>'));
expectType<commander.Argument>(program.createArgument('<name>', 'description'));
