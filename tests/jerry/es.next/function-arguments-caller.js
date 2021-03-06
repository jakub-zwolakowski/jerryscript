// Copyright JS Foundation and other contributors, http://js.foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var props = ['arguments', 'caller'];

function f_simple () {
}

function f_strict () {
  "use strict";
}

for (let prop of props) {
  try {
    Function.prototype[prop];
    assert(false);
  } catch (e) {
    assert(e instanceof TypeError);
  }

  assert(f_simple[prop] === null);

  try {
    f_strict[prop];
    assert(false);
  } catch (e) {
    assert(e instanceof TypeError);
  }

  let desc = Object.getOwnPropertyDescriptor(f_simple, prop);
  assert(desc.value === null);
  assert(desc.writable === false);
  assert(desc.enumerable === false);
  assert(desc.configurable === false);
  assert(Object.getOwnPropertyDescriptor(f_strict, prop) === undefined);
}
