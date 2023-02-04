import { expectType, expectAssignable } from 'tsd';
import { Command, Option, OptionValues } from '..';

function myParseInt(arg: string, previous: number): number {
  return parseInt(arg);
}
function myParseInts(arg: string, previous: number[]): number[] {
  return previous.concat(parseInt(arg));
}

// Reusing same program variable through tests for convenience.
const program = new Command();

const o1 = program
  .option('-d, --debug')
  .opts();
expectType<{ debug?: true }>(o1);

const o2 = program
  .option('--debug <value>')
  .opts();
expectType<{ debug?: string }>(o2);

const o3 = program
  .option('-o [optional]')
  .opts();
expectType<{ o?: string | true }>(o3);

const o4 = program
  .option('--debug <value...>')
  .opts();
expectType<{ debug?: string[] }>(o4);

const o5 = program
  .option('--debug [value...]')
  .opts();
expectType<{ debug?: string[] | true }>(o5);
if (o5.debug !== true && o5.debug !== undefined) o5.debug[0] = 'a'; // check expecting non-empty

// with default

const o6 = program
  .option('--debug', 'description', false)
  .opts();
expectType<{ debug: boolean }>(o6);

const o7 = program
  .option('--debug <value>', 'description', 'default')
  .opts();
expectType<{ debug: string }>(o7);

const o8 = program
  .option('--debug [value]', 'description', 'default')
  .opts();
expectType<{ debug: string | true }>(o8);

const o9 = program
  .option('--debug <value...>', 'description', [])
  .opts();
expectType<{ debug: [] | string[] }>(o9);

const o10 = program
  .option('--debug [value...]', 'description', [])
  .opts();
expectType<{ debug: string[] | true | [] }>(o10);

// Coerce/custom, w/wo defaults

const o11 = program
  .option('--debug <value>', 'description', myParseInt)
  .opts();
expectType<{ debug?: number }>(o11);

const o12 = program
  .option('--debug <value>', 'description', myParseInt, 11)
  .opts();
expectType<{ debug: number }>(o12);

const o13 = program
  .option('--debug [value...]', 'description', myParseInts)
  .opts();
expectType<{ debug?: true | number[] }>(o13);

const o14 = program
  .option('--debug [value...]', 'description', myParseInts, [])
  .opts();
expectType<{ debug: true | number[] }>(o14);

// requiredOption

const o15 = program
  .requiredOption('--debug <value>', 'description')
  .opts();
expectType<{ debug: string }>(o15);

const o16 = program
  .requiredOption('--debug [value]', 'description')
  .opts();
expectType<{ debug: string | true }>(o16);

// negated

const o17 = program
  .option('--C, --no-colour')
  .opts();
expectType<{ colour: boolean }>(o17);

const o18 = program
  .option('--c, --colour <string>')
  .option('--C, --no-colour')
  .opts();
expectType<{ colour?: string | false }>(o18);

const o19 = program
  .option('--c, --colour <string>', 'description', 'red')
  .option('--C, --no-colour')
  .opts();
expectType<{ colour: string | false }>(o19);

const o20 = program
  .addOption(new Option('-c, --colour').default(0).preset(BigInt(3)))
  .addOption(new Option('-C, --no-colour').preset('on'))
  .opts();
expectType<{ colour: string | number | bigint }>(o20);

// multiple

const m1 = program
  .option('--one')
  .option('--two <req>')
  .option('--three [opt]');
const m2 = m1.opts();
expectType<{ one?: true; two?: string; three?: string | true}>(m2);

// addOption

const ao1 = program
  .addOption(new Option('-de, --debug'))
  .opts();
expectType<{ debug?: true }>(ao1);

const ao2 = program
  .addOption(new Option('-de, --debug <value>'))
  .opts();
expectType<{ debug?: string }>(ao2);

const ao9 = program
  .addOption(new Option('-de, --debug [value]'))
  .opts();
expectType<{ debug?: string | true }>(ao9);

const ao3 = program
  .addOption(new Option('-de, --debug <value>').default('foo'))
  .opts();
expectType<{ debug: string }>(ao3);

const ao5 = program
  .addOption(new Option('--profit <value>').argParser(parseFloat))
  .opts();
expectType<{ profit?: number }>(ao5);

const ao6 = program
  .addOption(new Option('--profit <value>').argParser(parseFloat).default(3))
  .opts();
expectType<{ profit: number }>(ao6);

const ao7 = program
  .addOption(new Option('--password <value>').makeOptionMandatory())
  .opts();
expectType<{ password: string }>(ao7);

const ao8 = program
  .addOption(new Option('--password <value>'))
  .addOption(new Option('--no-password'))
  .opts();
expectType<{ password?: string | false }>(ao8);

// check passed into action handler

program
  .option('-d, --debug')
  .option('--required <r>')
  .option('--optional [o]')
  .action(options => {
    expectType<{ debug?: true, required?: string, optional?: true | string }>(options);
  });

// option names

const on1 = program
  .addOption(new Option('-d, --debug'))
  .opts();
expectType<{ debug?: true }>(on1);

const on2 = program
  .addOption(new Option('-C, --no-colour'))
  .opts();
expectType<{ colour: boolean }>(on2);

const on3 = program
  .addOption(new Option('--camel-case'))
  .opts();
expectType<{ camelCase?: true }>(on3);

const on4 = program
  .addOption(new Option('--no-camel-case'))
  .opts();
expectType<{ camelCase: boolean }>(on4);

// usage styles

const us1 = program
  .addOption(new Option('-d, --debug'))
  .opts();
expectType<{ debug?: true }>(us1);

const us2 = program
  .addOption(new Option('-d'))
  .opts();
expectType<{ d?: true }>(us2);

const us3 = program
  .addOption(new Option('--debug'))
  .opts();
expectType<{ debug?: true }>(us3);

const us4 = program
  .addOption(new Option('-d,--debug'))
  .opts();
expectType<{ debug?: true }>(us4);

const us5 = program
  .addOption(new Option('-d|--debug'))
  .opts();
expectType<{ debug?: true }>(us5);

const us6 = program
  .addOption(new Option('-d | --debug'))
  .opts();
expectType<{ debug?: true }>(us6);

const us7 = program
  .addOption(new Option('-d --debug'))
  .opts();
expectType<{ debug?: true }>(us7);

// choices

const co1 = program
  .addOption((new Option('-d, --debug <val>')).choices(['A', 'B'] as const))
  .opts();
expectType<{debug?: 'A' | 'B'}>(co1);

const co2 = program
  .addOption((new Option('-d, --debug [val]')).choices(['A', 'B'] as const))
  .opts();
expectType<{debug?: 'A' | 'B' | true}>(co2);

const co3 = program
  .addOption((new Option('-d, --debug <val>')).choices(['A', 'B'] as const).makeOptionMandatory())
  .opts();
expectType<{debug: 'A' | 'B'}>(co3)

const co4 = program
  .addOption((new Option('-d, --debug <val...>')).choices(['A', 'B'] as const))
  .opts();
expectType<{debug?: ('A' | 'B')[]}>(co4)

const co5 = program
  .addOption((new Option('-d, --debug [val...]')).choices(['A', 'B'] as const))
  .opts();
expectType<{debug?: ('A' | 'B')[] | true}>(co5)

const co6 = program
  .addOption((new Option('-d, --debug [val...]')).choices(['A', 'B'] as const).makeOptionMandatory())
  .opts();
expectType<{debug: ('A' | 'B')[] | true}>(co6)

const co7 = program
  .addOption((new Option('-d, --debug <val...>')).choices(['A', 'B'] as const).makeOptionMandatory())
  .opts();
expectType<{debug: ('A' | 'B')[]}>(co7)