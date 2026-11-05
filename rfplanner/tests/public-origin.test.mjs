import test from 'node:test';
import assert from 'node:assert/strict';
import { publicOrigin } from '../lib/public-origin.mjs';

test('reverse proxy uses explicitly configured public origin', () => {
  assert.equal(publicOrigin('http://localhost:5180/rfplanner/api/studies/', 'https://idatele.com'), 'https://idatele.com');
  assert.equal(publicOrigin('http://localhost:5180/rfplanner/', undefined), 'http://localhost:5180');
});
test('public origin rejects credentials, paths and non-http schemes', () => {
  for (const origin of ['https://user:secret@example.com', 'https://idatele.com/path', 'https://idatele.com?x=1', 'file:///tmp']) {
    assert.throws(() => publicOrigin('http://localhost:5180', origin));
  }
});
