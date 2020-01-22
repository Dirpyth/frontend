// @flow

type ReminderState = 'initial' | 'invalid' | 'pending' | 'success' | 'failure';

const setState = (state: ReminderState) => {
    const helpText = document.querySelector('.epic-reminder__email-help-text');
    const submitButton = document.querySelector(
        '.epic-reminder__submit-button'
    );
    const emailInput = document.querySelector('.epic-reminder__email-input');

    switch (state) {
        case 'invalid':
            helpText.innerHTML = 'Invalid email address';
            break;
        case 'pending':
            emailInput.disabled = true;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Pending';
            helpText.innerHTML = '';
            break;
        case 'success':
            submitButton.innerHTML = 'Signed Up';
            break;
        case 'failure':
            submitButton.innerHTML = 'Something went wrong';
            helpText.innerHTML =
                "Sorry we weren't able to sign you up for a reminder, please try again later";
            break;
        default:
            break;
    }
};

const isValidEmail = (email: string) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
};

const sendReminderEvent = () => {
    const isProd = false; // toDo make this dynamic

    const email = document.querySelector('.epic-reminder__email-input');

    const emailAddress = email instanceof HTMLInputElement ? email.value : '';

    if (!isValidEmail(emailAddress)) {
        setState('invalid');
    } else {
        setState('pending');
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
    }
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
                    setState('success');
                } else {
                    setState('failure');
                }
            });
        });
    }
};
