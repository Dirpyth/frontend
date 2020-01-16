// @flow
import fastdom from 'lib/fastdom-promise';
import type { RegisterListeners } from 'commercial/modules/messenger';

type AdSpec = {
    location: string, // Expect this to be of left, top or right
    backgroundColour: string,
    backgroundImage: string,
    backgroundPosition: string,
    backgroundSize: string,
    ctaUrl: string,
};

type SpecStyles = {
    backgroundColor: string,
    backgroundImage: string,
    backgroundPosition: string,
};

type PageSkinSection = {
    pageSkinSectionParent: HTMLElement,
    pageSkinSection: HTMLElement,
};

const getStylesFromSpec = (specs: AdSpec): SpecStyles =>
    Object.keys(specs).reduce((result, key) => {
        if (key !== 'scrollType') {
            result[key] = specs[key];
        }
        // Flow is love, Flow is Life! DFP has been passing us `backgroundColour`
        // all along, and the setting of this css prop has been silently failing
        if (key === 'backgroundColour') {
            result.backgroundColor = specs[key];
        }
        return result;
    }, {});

const renderPageSkin = (specs: AdSpec, adSlot: HTMLElement): Promise<any> => {
    if (
        !specs ||
        !('backgroundImage' in specs) ||
        !('backgroundPosition' in specs) ||
        !(adSlot instanceof Element)
    ) {
        return Promise.resolve();
    }

    const specStyles: SpecStyles = getStylesFromSpec(specs);

    // check to see whether the parent div exists already, if so, jut alter the style

    // TODO: use specs.location to define the section location and then assign this a class
    // Can then use this class to position with css rather than attempting to use JS.

    const pageSkinSectionParentClass = 'creative__page-skin-section-parent';
    const pageSkinSectionClass = 'creative__page-skin-section';

    const maybePageSkinSectionParent = ((adSlot.getElementsByClassName(
        pageSkinSectionParentClass
    ): any): HTMLCollection<HTMLElement>)[0];

    const maybePageSkinSection = maybePageSkinSectionParent
        ? ((maybePageSkinSectionParent.getElementsByClassName(
              pageSkinSectionClass
          ): any): HTMLCollection<HTMLElement>)[0]
        : null;
    const pageSkinSectionAlreadyExists = !!(
        maybePageSkinSectionParent && maybePageSkinSection
    );

    const getPageSkinSection = (): Promise<PageSkinSection> => {
        if (
            maybePageSkinSection &&
            maybePageSkinSectionParent &&
            pageSkinSectionAlreadyExists
        ) {
            return Promise.resolve({
                pageSkinSectionParent: maybePageSkinSectionParent,
                pageSkinSection: maybePageSkinSection,
            });
        }
        // Wrap the pageSkinSection image in a DIV for positioning. Also, we give
        // this DIV a pageSkinSection colour if it is provided. This is because
        // if we set the pageSkinSection colour in the creative itself, the pageSkinSection
        // image won't be visible (think z-indexed layers)
        const pageSkinSectionParent = document.createElement('div');

        // Create an element to hold the pageSkinSection image
        const pageSkinSection = document.createElement('div');
        pageSkinSectionParent.appendChild(pageSkinSection);

        return fastdom
            .write(() => {
                if (pageSkinSectionParent) {
                    adSlot.insertBefore(
                        pageSkinSectionParent,
                        adSlot.firstChild
                    );
                }
            })
            .then(() => ({ pageSkinSectionParent, pageSkinSection }));
    };

    const updateStyles = (
        pageSkinSectionParent: HTMLElement,
        pageSkinSection: HTMLElement
    ) => {
        pageSkinSectionParent.className = pageSkinSectionParentClass;
        pageSkinSection.className = pageSkinSectionClass;

        Object.assign(pageSkinSection.style, specStyles);

        return Promise.resolve({ pageSkinSectionParent, pageSkinSection });
    };

    return getPageSkinSection().then(
        ({ pageSkinSectionParent, pageSkinSection }) =>
            updateStyles(pageSkinSectionParent, pageSkinSection)
    );
};

const init = (register: RegisterListeners): void => {
    register(
        'nativePageSkin',
        (specs, ret, iframe): Promise<any> => {
            if (iframe && specs) {
                return renderPageSkin(specs, iframe.closest('.js-ad-slot'));
            }
            return Promise.resolve();
        }
    );
};

export const _ = { renderPageSkin };

export { init };
