'use strict';

module.exports = exports = [
    (session) => {

        delete session.userData.profile;
        delete session.userData.impersonated;
        delete session.userData.authToken;

        session.endConversation(`Oops! I'm suffering from a memory loss...`);
    }
];