import { expectType, expectAssignable } from 'tsd';
import { Command, Option, OptionValues } from '..';

const program = new Command();
program.setOptionValueWithSource('key', 'value', 'cli'); // expected source used by Commander
// Author is allowed to make up their own sources.
program.setOptionValueWithSource('key', 'value', 'my-custom-source1');

if (program.getOptionValueSource('key') === 'cli') {
  /* empty */
}
if (program.getOptionValueSource('key') === 'my-custom-source2') {
  /* empty */
}
