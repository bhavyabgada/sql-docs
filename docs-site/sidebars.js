/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: '0_readme',
    },
    {
      type: 'category',
      label: 'Basic SQL Commands',
      items: ['1_basic_sql_commands/README', '1_basic_sql_commands/1_basic_sql_commands', '1_basic_sql_commands/sql_cheatsheet'],
    },
    {
      type: 'category',
      label: 'Advanced Query Techniques',
      items: ['2_advanced_query_techniques/README'],
    },
    {
      type: 'category',
      label: 'Transactions and Concurrency',
      items: ['3_transactions_and_concurrency/README'],
    },
    {
      type: 'category',
      label: 'Data Types and Special Features',
      items: ['4_data_types_json_xml_arrays/README'],
    },
    {
      type: 'category',
      label: 'Procedural SQL',
      items: ['5_procedural_sql/README'],
    },
    {
      type: 'category',
      label: 'Analytical and Performance Features',
      items: ['6_analytical_and_performance_features/README'],
    },
    {
      type: 'category',
      label: 'Reporting and Pivoting',
      items: ['7_reporting_and_pivoting/README'],
    },
    {
      type: 'category',
      label: 'Unique SQL Features',
      items: ['8_unique_sql_features/README'],
    },
  ],
};

module.exports = sidebars; 