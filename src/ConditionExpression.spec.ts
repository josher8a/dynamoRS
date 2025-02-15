import {describe, it, expect} from 'bun:test';
import { Condition, AttributePath } from "./Brushless.bs";
const {
    equals,
    notEquals,
    lessThan,
    lessThanOrEqualTo,
    greaterThan,
    greaterThanOrEqualTo,
    between,
    inList,
    attributeExists,
    attributeNotExists,
    attributeType,
    beginsWith,
    contains,
} = Condition.Maker;

const name = AttributePath.fromString('name');
describe('equals', () => {
    it('should return an equality condition predicate', () => {
        const pred = equals(name, AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('=');
    });
});

describe('notEquals', () => {
    it('should return an inequality condition predicate', () => {
        const pred = notEquals(name, AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('<>');
    });
});

describe('lessThan', () => {
    it('should return an < condition predicate', () => {
        const pred = lessThan(name,AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('<');
    });
});

describe('lessThanOrEqualTo', () => {
    it('should return an <= condition predicate', () => {
        const pred = lessThanOrEqualTo(name,AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('<=');
    });
});

describe('greaterThan', () => {
    it('should return an > condition predicate', () => {
        const pred = greaterThan(name,AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('>');
    });
});

describe('greaterThanOrEqualTo', () => {
    it('should return an >= condition predicate', () => {
        const pred = greaterThanOrEqualTo(name,AttributePath.fromString('foo'));
        // expect(isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.TAG).toBe('Comparison');
        if(pred.TAG == 'Comparison')  expect(pred.comparator).toBe('>=');
    });
});

// describe('between', () => {
//     it('should return a bounded condition predicate', () => {
//         const pred = between(name,{1, 10});
//         // expect(isConditionExpressionPredicate(pred)).toBe(true);
//         expect(pred).toEqual({
//             TAG: 'Between',
//             lowerBound: 1,
//             upperBound: 10,
//         });
//     });
// });

// describe('inList', () => {
//     it('should return a membership condition predicate', () => {
//         const pred = inList(name,['foo', 'bar', 'baz', 'quux']);
//         expect(isConditionExpressionPredicate(pred)).toBe(true);
//         expect(pred).toEqual({
//             type: 'Membership',
//             values: [
//                 'foo',
//                 'bar',
//                 'baz',
//                 'quux',
//             ]
//         });
//     });
// });

// describe('attributeExists', () => {
//     it('should return an attribute_exists function predicate', () => {
//         const pred = attributeExists(name,);
//         expect(pred.TAG).toBe('AttributeExists');
//     });
// });

// describe('attributeNotExists', () => {
//     it('should return an attribute_not_exists function predicate', () => {
//         const pred = attributeNotExists(name);
//         expect(pred.TAG).toBe('attribute_not_exists');
//     });
// });

// describe('attributeType', () => {
//     it('should return an attribute_type function predicate', () => {
//         const pred = attributeType(name, 'BOOL');
//         expect(pred.TAG).toBe('AttributeType');
//         expect(pred.TAG == 'AttributeType' && pred.comparator).toBe('BOOL');
//     });
// });

// describe('beginsWith', () => {
//     it('should return an begins_with function predicate', () => {
//         const pred = beginsWith('prefix');
//         expect(isConditionExpressionPredicate(pred)).toBe(true);
//         expect(pred.TAG).toBe('Function');
//         expect(pred.name).toBe('begins_with');
//         expect(pred.expected).toBe('prefix');
//     });
// });

// describe('contains', () => {
//     it('should return an contains function predicate', () => {
//         const pred = contains('substr');
//         expect(isConditionExpressionPredicate(pred)).toBe(true);
//         expect(pred.TAG).toBe('Function');
//         expect(pred.name).toBe('contains');
//         expect(pred.expected).toBe('substr');
//     });
// });

// describe('isConditionExpressionPredicate', () => {
//     it('should return true for a valid predicate', () => {
//         expect(isConditionExpressionPredicate({type: 'Equals', object: 0}))
//             .toBe(true);
//     });

//     it('should reject non-matching values', () => {
//         for (const notPredicate of [
//             false,
//             true,
//             null,
//             void 0,
//             'string',
//             123,
//             [],
//             {},
//             new Uint8Array(12),
//             {foo: 'bar'},
//             {name: 'foo', arguments: 'bar'},
//             {S: 'string'}
//         ] as any[]) {
//             expect(isConditionExpressionPredicate(notPredicate)).toBe(false);
//         }
//     });
// });

// describe('isConditionExpressionSubject', () => {
//     it('should return true for a string subject', () => {
//         expect(isConditionExpressionSubject({subject: 'foo'})).toBe(true);
//     });

//     it('should return true for an AttributePath subject', () => {
//         expect(isConditionExpressionSubject({
//             subject: AttributePath.fromString('foo.bar[3]'),
//         })).toBe(true);
//     });

//     it('should reject non-matching values', () => {
//         for (const notSubject of [
//             false,
//             true,
//             null,
//             void 0,
//             'string',
//             123,
//             [],
//             {},
//             new Uint8Array(12),
//             {foo: 'bar'},
//             {name: 'foo', arguments: 'bar'},
//             {S: 'string'},
//             {subject: 123},
//         ]) {
//             expect(isConditionExpressionSubject(notSubject)).toBe(false);
//         }
//     });
// });

// describe('isConditionExpression', () => {
//     it('should return true for valid expressions', () => {
//         expect(isConditionExpression({
//             type: 'Equals',
//             subject: 'foo',
//             object: 'bar',
//         })).toBe(true);
//     });

//     it('should return true for function expressions', () => {
//         expect(isConditionExpression(
//             new FunctionExpression('attribute_not_exists', 'foo')
//         )).toBe(true);
//     });

//     it('should return true for negation expressions', () => {
//         expect(isConditionExpression({
//             type: 'Not',
//             condition: {
//                 type: 'Between',
//                 subject: 'foo',
//                 lowerBound: 100,
//                 upperBound: 200,
//             }
//         })).toBe(true);
//     });

//     it('should return true for compound expressions', () => {
//         for (const type of ['And', 'Or'] as const) {
//             expect(isConditionExpression({
//                 type,
//                 conditions: [
//                     {
//                         type: 'Between',
//                         subject: 'foo',
//                         lowerBound: 100,
//                         upperBound: 200,
//                     },
//                     {
//                         type: 'Between',
//                         subject: 'foo',
//                         lowerBound: 400,
//                         upperBound: 600,
//                     },
//                 ]
//             })).toBe(true);
//         }
//     });

//     it('should reject compound expressions without a conditions list', () => {
//         for (const type of ['And', 'Or'] as const) {
//             expect(isConditionExpression({type} as any)).toBe(false);
//         }
//     });

//     it(
//         'should reject compound expressions whose list contains invalid members',
//         () => {

//             for (const type of ['And', 'Or'] as const) {
//                 expect(isConditionExpression({
//                     type: type as any,
//                     conditions: ['foo', 123] as any,
//                 })).toBe(false);
//             }
//         }
//     );

//     it('should reject non-matching values', () => {
//         for (const notExpression of [
//             false,
//             true,
//             null,
//             void 0,
//             'string',
//             123,
//             [],
//             {},
//             new Uint8Array(12),
//             {foo: 'bar'},
//             {name: 'foo', arguments: 'bar'},
//             {S: 'string'},
//             {subject: 'foo', object: 'bar'},
//             {type: 'UnknownType', subject: 'foo', object: 'bar'},
//         ] as any[]) {
//             expect(isConditionExpression(notExpression)).toBe(false);
//         }
//     });
// });

// describe('serializeConditionExpression', () => {
//     it('should serialize equality expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'Equals',
//                 subject: 'foo',
//                 object: 'bar',
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 = :val1');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({':val1': {S: 'bar'}});
//     });

//     it('should serialize inequality expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {type: 'NotEquals', subject: 'foo', object: 'bar'},
//             attributes
//         );

//         expect(serialized).toBe('#attr0 <> :val1');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({':val1': {S: 'bar'}});
//     });

//     it('should serialize less than expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {type: 'LessThan', subject: 'foo', object: 'bar'},
//             attributes
//         );

//         expect(serialized).toBe('#attr0 < :val1');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({':val1': {S: 'bar'}});
//     });

//     it('should serialize greater than expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'GreaterThan',
//                 subject: 'foo',
//                 object: new FunctionExpression('size', AttributePath.fromString('bar')),
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 > size(#attr1)');
//         expect(attributes.names).toEqual({
//             '#attr0': 'foo',
//             '#attr1': 'bar'
//         });
//         expect(attributes.values).toEqual({});
//     });

//     it('should serialize less than or equal to expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'LessThanOrEqualTo',
//                 subject: 'foo',
//                 object: 'bar',
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 <= :val1');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({':val1': {S: 'bar'}});
//     });

//     it('should serialize greater than or equal to expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'GreaterThanOrEqualTo',
//                 subject: 'foo',
//                 object: AttributePath.fromString('bar'),
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 >= #attr1');
//         expect(attributes.names).toEqual({
//             '#attr0': 'foo',
//             '#attr1': 'bar',
//         });
//         expect(attributes.values).toEqual({});
//     });

//     it('should serialize bounding expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'Between',
//                 subject: 'foo',
//                 lowerBound: 1,
//                 upperBound: 10,
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 BETWEEN :val1 AND :val2');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({
//             ':val1': {N: '1'},
//             ':val2': {N: '10'},
//         });
//     });

//     it('should serialize membership expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'Membership',
//                 subject: 'foo',
//                 values: [
//                     1,
//                     10,
//                     100,
//                 ],
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 IN (:val1, :val2, :val3)');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({
//             ':val1': {N: '1'},
//             ':val2': {N: '10'},
//             ':val3': {N: '100'},
//         });
//     });

//     describe('function expressions', () => {
//         it('should serialize attribute_exists expressions', () => {
//             const attributes = new ExpressionAttributes();
//             const serialized = serializeConditionExpression(
//                 {type: 'Function', subject: 'foo', name: 'attribute_exists'},
//                 attributes
//             );

//             expect(serialized).toBe('attribute_exists(#attr0)');
//             expect(attributes.names).toEqual({'#attr0': 'foo'});
//             expect(attributes.values).toEqual({});
//         });

//         it('should serialize attribute_not_exists expressions', () => {
//             const attributes = new ExpressionAttributes();
//             const serialized = serializeConditionExpression(
//                 {type: 'Function', subject: 'foo', name: 'attribute_not_exists'},
//                 attributes
//             );

//             expect(serialized).toBe('attribute_not_exists(#attr0)');
//             expect(attributes.names).toEqual({'#attr0': 'foo'});
//             expect(attributes.values).toEqual({});
//         });

//         it('should serialize attribute_type expressions', () => {
//             const attributes = new ExpressionAttributes();
//             const serialized = serializeConditionExpression(
//                 {
//                     type: 'Function',
//                     subject: 'foo',
//                     name: 'attribute_type',
//                     expected: 'S'
//                 },
//                 attributes
//             );

//             expect(serialized).toBe('attribute_type(#attr0, :val1)');
//             expect(attributes.names).toEqual({'#attr0': 'foo'});
//             expect(attributes.values).toEqual({':val1': {S: 'S'}});
//         });

//         it('should serialize begins_with expressions', () => {
//             const attributes = new ExpressionAttributes();
//             const serialized = serializeConditionExpression(
//                 {
//                     type: 'Function',
//                     subject: 'foo',
//                     name: 'begins_with',
//                     expected: 'prefix'
//                 },
//                 attributes
//             );

//             expect(serialized).toBe('begins_with(#attr0, :val1)');
//             expect(attributes.names).toEqual({'#attr0': 'foo'});
//             expect(attributes.values).toEqual({':val1': {S: 'prefix'}});
//         });

//         it('should serialize contains expressions', () => {
//             const attributes = new ExpressionAttributes();
//             const serialized = serializeConditionExpression(
//                 {
//                     type: 'Function',
//                     subject: 'foo',
//                     name: 'contains',
//                     expected: 'substr'
//                 },
//                 attributes
//             );

//             expect(serialized).toBe('contains(#attr0, :val1)');
//             expect(attributes.names).toEqual({'#attr0': 'foo'});
//             expect(attributes.values).toEqual({':val1': {S: 'substr'}});
//         });
//     });

//     it('should serialize negation expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'Not',
//                 condition: {
//                     type: 'Between',
//                     subject: 'foo',
//                     lowerBound: 1,
//                     upperBound: 10,
//                 }
//             },
//             attributes
//         );

//         expect(serialized).toBe('NOT (#attr0 BETWEEN :val1 AND :val2)');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({
//             ':val1': {N: '1'},
//             ':val2': {N: '10'},
//         });
//     });

//     it('should serialize and expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'And',
//                 conditions: [
//                     {
//                         type: 'GreaterThanOrEqualTo',
//                         subject: 'foo',
//                         object: 1,
//                     },
//                     {
//                         type: 'LessThan',
//                         subject: 'foo',
//                         object: 10,
//                     },
//                     {
//                         type: 'Equals',
//                         subject: 'fizz',
//                         object: 'buzz',
//                     }
//                 ]
//             },
//             attributes
//         );

//         expect(serialized).toBe('(#attr0 >= :val1) AND (#attr0 < :val2) AND (#attr3 = :val4)');
//         expect(attributes.names).toEqual({
//             '#attr0': 'foo',
//             '#attr3': 'fizz',
//         });
//         expect(attributes.values).toEqual({
//             ':val1': {N: '1'},
//             ':val2': {N: '10'},
//             ':val4': {S: 'buzz'},
//         });
//     });

//     it('should serialize single-clause and expressions as the underlying expression type', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'And',
//                 conditions: [
//                     {
//                         type: 'Membership',
//                         subject: 'foo',
//                         values: [
//                             1,
//                             10,
//                             100,
//                         ],
//                     },
//                 ]
//             },
//             attributes
//         );

//         expect(serialized).toBe('#attr0 IN (:val1, :val2, :val3)');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({
//             ':val1': {N: '1'},
//             ':val2': {N: '10'},
//             ':val3': {N: '100'},
//         });
//     });

//     it('should serialize or expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             {
//                 type: 'Or',
//                 conditions: [
//                     {
//                         type: 'GreaterThanOrEqualTo',
//                         subject: 'foo',
//                         object: 10,
//                     },
//                     {
//                         type: 'LessThan',
//                         subject: 'foo',
//                         object: 1,
//                     }
//                 ]
//             },
//             attributes
//         );

//         expect(serialized).toBe('(#attr0 >= :val1) OR (#attr0 < :val2)');
//         expect(attributes.names).toEqual({
//             '#attr0': 'foo',
//         });
//         expect(attributes.values).toEqual({
//             ':val1': {N: '10'},
//             ':val2': {N: '1'},
//         });
//     });

//     it('should serialize function expressions', () => {
//         const attributes = new ExpressionAttributes();
//         const serialized = serializeConditionExpression(
//             new FunctionExpression(
//                 'attribute_type',
//                 AttributePath.fromString('foo'),
//                 'S'
//             ),
//             attributes
//         );

//         expect(serialized).toBe('attribute_type(#attr0, :val1)');
//         expect(attributes.names).toEqual({'#attr0': 'foo'});
//         expect(attributes.values).toEqual({':val1': {S: 'S'}});
//     });
// });
