// @flow

export const acquisitionsEpicReminderTemplate = `
    <div id="epic-reminder" class="js-epic-reminder epic-reminder">
        <input type="checkbox" id="epic-reminder__reveal-reminder" class="epic-reminder__reveal-reminder" role="button">
        <label for="epic-reminder__reveal-reminder" class="epic-reminder__prompt-label">
             <div class="epic-reminder__prompt">
                    <span class="epic-reminder__prompt-text">
                        Not a good time? Remind me later
                    </span>
                 </div>
             </label>

        <div class="epic-reminder__signup" >
         <label for="epic-reminder__reveal-reminder" class="epic-reminder__close-button-label">
            <div class="epic-reminder__close-button"> X </div>
          </label>
            <div class="epic-reminder__form-title">Remind me in March 2020</div>

            <form>
                <label for="epic-reminder__email-input" class="epic-reminder__email-label">Email address</label>
                <small id="epic-reminder__email-help-text" class="epic-reminder__help-text"></small>
               <div class="epic-reminder__email-input-wrapper">

                 <input type="email" class="epic-reminder__email-input" id=epic-reminder__email-input" aria-describedby="epic-reminder__email-help-text">
                  <div class="epic-reminder__submit-button-wrapper">
                      <button type="submit" class="epic-reminder__submit-button component-button component-button--hasicon-right" id="epic-reminder__submit-button">
                      Set a reminder
                         <svg class="svg-arrow-right-straight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 17.89" preserveAspectRatio="xMinYMid" aria-hidden="true" focusable="false">
                        <path d="M20 9.35l-9.08 8.54-.86-.81 6.54-7.31H0V8.12h16.6L10.06.81l.86-.81L20 8.51v.84z"></path>
                        </svg>
                      </button>
                  </div>
                </div>
            </form>

            <small id="epic-reminder__email-terms-and-conditions" class="epic-reminder__email-help-text">
                We will use this to send you a single email in March. To find out what personal data we collect and how we use it, please visit our <a href=">https://www.theguardian.com/help/privacy-policy">Privacy Policy</a>
            </small>
        </div>
    </div>
`;
