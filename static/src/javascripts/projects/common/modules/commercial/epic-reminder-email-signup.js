// @flow

const sendReminderEvent = () => {
    console.log('sendReminderEvent');
    const isProd = false; // toDo make this dynamic

    const email = document.querySelector('.epic-reminder__email-input');

    const emailAddress = email instanceof HTMLInputElement ? email.value : '';

    const createReminderEndpoint = isProd
        ? 'https://contribution-reminders.support.guardianapis.com/remind-me'
        : 'https://contribution-reminders-code.support.guardianapis.com/remind-me';

    return fetch(createReminderEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailAddress,
            reminderDate: '2020-03-19',
            isPreContribution: true,
        }),
    });
};

export const initReminderEmailSignup = () => {
    console.log('initReminderEmailSignup');
    const reminderSubmitButton = document.querySelector(
        '.epic-reminder__submit-button'
    );
    if (reminderSubmitButton) {
        reminderSubmitButton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            sendReminderEvent().then(response => {
                if (response.ok) {
                    console.log('got ok');
                } else {
                    console.log('not ok');
                }
            });
        });
    }
};
