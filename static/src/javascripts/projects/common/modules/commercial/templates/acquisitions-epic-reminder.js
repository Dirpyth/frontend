// @flow

export const acquisitionsEpicReminderTemplate = `
    <div id="epic-reminder" class="js-epic-reminder epic-reminder">
        <div class="epic-reminder__prompt">
            <span class="epic-reminder__prompt-text">
                Not a good time? Remind me later
            </span>
        </div>
        <div class="epic-reminder__signup" >
            <div class="epic-reminder__close-button"/>
            <div class="epic-reminder__form-title">Remind me in March 2020</div>

            <form>
                <label for="epic-reminder__email-input" class="epic-reminder__email-label">Email address</label>
                <small id="epic-reminder__email-help-text" class="epic-reminder__email-help-text">Insert your email address here</small>
               <div class="epic-reminder__email-input-wrapper">
                 <input type="email" class="epic-reminder__email-input" id=epic-reminder__email-input" aria-describedby="epic-reminder__email-help-text">
                  <div class="epic-reminder__submit-button-wrapper">
                      <input type="submit" class="epic-reminder__submit-button" value="Set a reminder" onclick="sendReminderEvent()">
                  </div>
                </div>
            </form>

            <small id="epic-reminder__email-terms-and-conditions" class="epic-reminder__email-help-text">
                We will use this to send you a single email in March. To find out what personal data we collect and how we use it, please visit our <a href=">https://www.theguardian.com/help/privacy-policy">Privacy Policy</a>
            </small>
        </div>
    </div>
`;

// function sendReminderEvent() {
//     const isProd = false;
//     const createReminderEndpoint = isProd
//         ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
//         : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';
//
//     return fetch(createReminderEndpoint, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: 'joemgriffiths+150@gmail.com',
//             reminderDate: '2020-03-19',
//             isPreContribution: true,
//         }),
//     }).then(r => r);
//
//     //     .then((response) => {
//     //     if (response.ok) {
//     //         this.requestHasSucceeded();
//     //     } else {
//     //         this.requestHasFailed();
//     //         logException('Reminder sign up failed at the point of request');
//     //     }
//     // });
// }
