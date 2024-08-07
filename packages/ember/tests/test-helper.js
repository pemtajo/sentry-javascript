import sinon from 'sinon';
import * as Sentry from '@sentry/browser';

/**
 * Stub Sentry init function before application is imported to avoid actually setting up Sentry and needing a DSN
 */
sinon.stub(Sentry, 'init');

import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Ember from 'ember';

Sentry.addGlobalEventProcessor((event) => {
  if (Ember.testing) {
    if (!window._sentryTestEvents) {
      window._sentryTestEvents = [];
    }
    window._sentryTestEvents.push(event);
  }
  return event;
});

setApplication(Application.create(config.APP));

start();
QUnit.config.ignoreGlobalErrors = true;
