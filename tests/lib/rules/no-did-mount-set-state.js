/**
 * @fileoverview Prevent usage of setState in componentDidMount
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var eslint = require('eslint').linter;
var ESLintTester = require('eslint-tester');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('lib/rules/no-did-mount-set-state', {

    valid: [
        {
            code: '\
              var Hello = React.createClass({\
                render: function() {\
                  return <div>Hello {this.props.name}</div>;\
                }\
              });',
            ecmaFeatures: {
              jsx: true
            }
        }, {
            code: '\
              var Hello = React.createClass({\
                componentDidMount: function() {},\
                render: function() {\
                  return <div>Hello {this.props.name}</div>;\
                }\
              });',
            ecmaFeatures: {
              jsx: true
            }
        }, {
            code: '\
              var Hello = React.createClass({\
                componentDidMount: function() {\
                  someNonMemberFunction(arg);\
                  this.someHandler = this.setState;\
                },\
                render: function() {\
                  return <div>Hello {this.props.name}</div>;\
                }\
              });',
            ecmaFeatures: {
              jsx: true
            }
        }
    ],

    invalid: [
        {
            code: '\
              var Hello = React.createClass({\
                componentDidMount: function() {\
                  this.setState({\
                    name: this.props.name.toUpperCase()\
                  });\
                },\
                render: function() {\
                  return <div>Hello {this.state.name}</div>;\
                }\
              });',
            ecmaFeatures: {
              jsx: true
            },
            errors: [{
                message: 'Do not use setState in componentDidMount'
            }]
        }
    ]
});
