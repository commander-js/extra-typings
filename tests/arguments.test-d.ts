import { expectType, expectAssignable } from 'tsd';
import { Command, Argument, OptionValues } from '..';

// Reusing same program variable through tests for convenience.
const program = new Command();

/**
 * Check when no command-arguments.
 */

program
  .action((options) => {
    expectAssignable<OptionValues>(options);
  });

/**
 * Check command-arguments from .argument
 */

program
  .argument('<foo>')
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[bar]')
  .action((bar, options) => {
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('<foo>')
  .argument('[bar]')
  .action((foo, bar, options) => {
    expectType<string>(foo);
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[foo]', 'description', 'default')
  .action((foo, options, cmd) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('<mult...>')
  .action((m, options) => {
    expectType<string[]>(m);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[mult...]')
  .action((m, options) => {
    expectType<string[]>(m);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[mult...]', 'description', [])
  .action((m, options) => {
    // The wild looking never[] is how TypeScript represents the type of the untyped empty array passed as default.
    expectType<string[] | never[]>(m);
    expectAssignable<OptionValues>(options);
  });

function myParseInt(arg: string, previous: number): number {
  return parseInt(arg);
}
function myParseInts(arg: string, previous: number[]): number[] {
  return previous.concat(parseInt(arg));
}

program
  .argument('<height>', 'description', myParseInt)
  .action((h, options) => {
    expectType<number>(h);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[height]', 'description', myParseInt)
  .action((h, options) => {
    expectType<number | undefined>(h);
    expectAssignable<OptionValues>(options);
  });

program
  .argument('[height...]', 'description', myParseInts, [])
  .action((h, options) => {
    expectType<number[]>(h);
    expectAssignable<OptionValues>(options);
  });

/**
 * Check command-arguments from .arguments()
 */

program
  .arguments('<foo>')
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .arguments('[bar]')
  .action((bar, options) => {
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

program
  .arguments('<foo> [bar]')
  .action((foo, bar, options) => {
    expectType<string>(foo);
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });


program
  .arguments('<file> <file> [files...]')
  .action((foo1, foo2, mult, options) => {
    expectType<string>(foo1);
    expectType<string>(foo2);
    expectType<string[]>(mult);
    expectAssignable<OptionValues>(options);
  });

/**
 * Check command-arguments from .addArgument()
 */

program
  .addArgument(new Argument('<foo>'))
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('[bar]'))
  .action((bar, options, cmd) => {
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('<foo>'))
  .addArgument(new Argument('[bar]'))
  .action((foo, bar, options) => {
    expectType<string>(foo);
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('<foo...>'))
  .action((foo, options) => {
    expectType<string[]>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('[foo...]'))
  .action((foo, options) => {
    expectType<string[]>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('[foo]').default('x'))
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

// mixed types possible, but unusual
program
  .addArgument(new Argument('[foo]').default(3))
  .action((foo, options) => {
    expectType<string | number>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('foo'))
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('foo').argRequired())
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('foo').argOptional())
  .action((foo, options) => {
    expectType<string | undefined>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('foo...').argRequired())
  .action((foo, options) => {
    expectType<string[]>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('foo...').argOptional())
  .action((foo, options) => {
    expectType<string[]>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('<foo>').argParser(myParseInt))
  .action((foo, options) => {
    expectType<number>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('[foo]').argParser(myParseInt))
  .action((foo, options) => {
    expectType<number | undefined>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument('<foo...>').argParser(myParseInts))
  .action((foo, options) => {
    expectType<number[]>(foo);
    expectAssignable<OptionValues>(options);
  });

// Test default then optional play well together.
program
  .addArgument(new Argument('foo').default('missing').argOptional())
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

// Test optional then default play well together.
program
  .addArgument(new Argument('foo').argOptional().default('missing'))
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

/** 
 * Check command-arguments from .command('name <ARGS>')
 */

program
  .command('sub1')
  .action((options) => {
    expectAssignable<OptionValues>(options);
  });

program
  .command('sub2 <foo>')
  .action((foo, options) => {
    expectType<string>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .command('sub3 [bar]')
  .action((bar, options) => {
    expectType<string | undefined>(bar);
    expectAssignable<OptionValues>(options);
  });

// choices
program
  .addArgument(new Argument("<foo>").choices(["A", "B"] as const))
  .action((foo, options) => {
    expectType<"A" | "B">(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument("[foo]").choices(["A", "B"] as const))
  .action((foo, options) => {
    expectType<"A" | "B" | undefined>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument("<foo...>").choices(["A", "B"] as const))
  .action((foo, options) => {
    expectType<("A" | "B")[]>(foo);
    expectAssignable<OptionValues>(options);
  });

program
  .addArgument(new Argument("[foo...]").choices(["A", "B"] as const))
  .action((foo, options) => {
    expectType<("A" | "B")[]>(foo);
    expectAssignable<OptionValues>(options);
  });

// default type ignored when arg is required
expectType<('C')>(
  program
    .addArgument(new Argument('<foo>').default('D' as const).choices(['C'] as const))
    .parse()
    .processedArgs[0]
)

// default before choices results in union when arg optional
expectType<('C' | 'D')>(
  program
    .addArgument(new Argument('[foo]').default('D' as const).choices(['C'] as const))
    .parse()
    .processedArgs[0]
)

// default after choices is still union type
expectType<('C' | 'D')>(
  program
    .addArgument(new Argument('[foo]').choices(['C'] as const).default('D' as const))
    .parse()
    .processedArgs[0]
)

// argRequired after choices still narrows type
expectType<('C')>(
  program
    .addArgument(new Argument('foo').choices(['C'] as const).argRequired())
    .parse()
    .processedArgs[0]
)

// argRequired before choices still narrows type
expectType<('C')>(
  program
    .addArgument(new Argument('foo').argRequired().choices(['C'] as const))
    .parse()
    .processedArgs[0]
)

// argOptional after choices narrows type and includes undefined
expectType<('C' | undefined)>(
  program
    .addArgument(new Argument('foo').choices(['C'] as const).argOptional())
    .parse()
    .processedArgs[0]
)

// argOptional before choices narrows type and includes undefined
expectType<('C' | undefined)>(
  program
    .addArgument(new Argument('foo').argOptional().choices(['C'] as const))
    .parse()
    .processedArgs[0]
)

// argParser after choices overrices choice type
expectType<(number)>(
  program
    .addArgument(new Argument('<foo>').choices(['C'] as const).argParser((val: string, prev: number) => prev + Number.parseInt(val)))
    .parse()
    .processedArgs[0]
)

// choices after argParser overrides argParser type
expectType<('C')>(
  program
    .addArgument(new Argument('<foo>').argParser((val: string, prev: number) => prev + Number.parseInt(val)).choices(['C'] as const))
    .parse()
    .processedArgs[0]
)
