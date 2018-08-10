//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import store from '../data/store';
import { CommandRegistryImpl } from '../../../../sdk/shared/built';
import { SharedConstants, newNotification } from '../../../shared/built';
import { Notification } from '../../../shared/built';
import { getGlobal } from '../utils/getGlobal';
import * as NotificationActions from '../data/action/notificationActions';

/** Registers notification commands */
export function registerCommands(commandRegistry: CommandRegistryImpl) {
  const Commands = SharedConstants.Commands.Notifications;
  // ---------------------------------------------------------------------------
  // Adds a notification from the main side to the store / notification manager
  commandRegistry.registerCommand(Commands.Add, () => {
    const notification: Notification = getGlobal(SharedConstants.NOTIFICATION_FROM_MAIN);
    store.dispatch(NotificationActions.beginAdd(notification));
  });

  // ---------------------------------------------------------------------------
  // Removes a notification from the store / notification manager
  commandRegistry.registerCommand(Commands.Remove, (id: string) => {
    store.dispatch(NotificationActions.beginRemove(id));
  });

  commandRegistry.registerCommand('demo', () => {
    const notification: Notification = newNotification('HIT ME');
    notification.addButton('Demo', () => {
      //
      console.log('meow');
      var a = 1 + 2 + 3;
      console.log(a);
      console.log(a + 5);
      //
    });
    store.dispatch(NotificationActions.beginAdd(notification));
  });
}