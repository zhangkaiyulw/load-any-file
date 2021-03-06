const path = require('path');
const fs = require('fs');
const { assert } = require('chai');
const loadFile = require('../../index');
const LoadAnyFileError = require('../../lib/LoadAnyFileError');

const alterDependency = (name) => {
  return () => {
    const original = path.join(__dirname, '../../node_modules/' + name);
    fs.renameSync(original, original + '_alt');
  };
};

const recoverDependency = (name) => {
  return () => {
    const original = path.join(__dirname, '../../node_modules/' + name);
    fs.renameSync(original + '_alt', original);
  };
};

describe('Throws dependency missing error: ', function() {
  describe('when requiring ts file', function() {
    beforeEach(alterDependency('typescript'));
    afterEach(recoverDependency('typescript'));
    it('typescript is not installed but ts-node is installed', function() {
      assert.throws(
        () => loadFile(path.join(__dirname, './config.ts')),
        LoadAnyFileError,
        "Dependency missing. Please install 'typescript'."
      );
    });
  });
  describe('when requiring ts file', function() {
    beforeEach(alterDependency('ts-node'));
    afterEach(recoverDependency('ts-node'));
    it('ts-node is not installed but typescript is installed', function() {
      assert.throws(
        () => loadFile(path.join(__dirname, './config2.ts')),
        LoadAnyFileError,
        "Dependency missing. Please install 'ts-node'."
      );
    });
  });
  describe('when requiring cson file', function() {
    beforeEach(alterDependency('cson-parser'));
    afterEach(recoverDependency('cson-parser'));
    it('cson-parser is not installed', function() {
      assert.throws(
        () => loadFile(path.join(__dirname, './config.cson')),
        LoadAnyFileError,
        "Dependency missing. Please install 'cson-parser'."
      );
    });
  });
  describe('when requiring coffee file', function() {
    beforeEach(alterDependency('coffeescript'));
    afterEach(recoverDependency('coffeescript'));
    it('coffeescript is not installed', function() {
      assert.throws(
        () => loadFile(path.join(__dirname, './config.coffee')),
        LoadAnyFileError,
        "Dependency missing. Please install 'coffeescript'."
      );
    });
  });
  describe('when requiring yaml file', function() {
    beforeEach(alterDependency('js-yaml'));
    afterEach(recoverDependency('js-yaml'));
    it('js-yaml is not installed', function() {
      assert.throws(
        () => loadFile(path.join(__dirname, './config.yaml')),
        LoadAnyFileError,
        "Dependency missing. Please install 'js-yaml'."
      );
    });
  });
});
