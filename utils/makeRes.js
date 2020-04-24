//build a response with a header and a basic body, based on the correspondnig platform
//currently platform only checks for google
//no context at all

function makeRes(msg, google, outputContexts) {
  if (google) {
    return {
      fulfillmentMessages: [
        {
          platform: 'ACTIONS_ON_GOOGLE',
          simpleResponses: {
            simpleResponses: [
              {
                textToSpeech: `${msg}`,
                displayText: `${msg}`,
              },
            ],
          },
        },
        {
          basicCard: {
            title: `${msg}`,
            image: {
              imageUri:
                'https://i2.wp.com/revsustainability.com/wp-content/uploads/2015/05/calpluglogo.jpg',
              accessibilityText: 'accessibility text',
            },
          },
          platform: 'ACTIONS_ON_GOOGLE',
        },
        // {
        //   suggestions: {
        //     suggestions: [
        //       {
        //         title: 'suggestion1',
        //       },
        //       {
        //         title: 'suggestion2',
        //       },
        //       {
        //         title: 'suggestion3',
        //       },
        //     ],
        //   },
        //   platform: 'ACTIONS_ON_GOOGLE',
        // },
      ],
      outputContexts: outputContexts ? [...outputContexts] : [],
    };
  } else {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: [`${msg}`],
          },
        },
        {
          card: {
            title: 'template',
            imageUri:
              'https://thumbs.gfycat.com/KnobbyImperfectCoypu-max-1mb.gif',
          },
        },
        {
          quickReplies: {
            quickReplies: ['suggestion1', 'suggestion2', 'suggestion3'],
          },
        },
      ],
      outputContexts: outputContexts ? [...outputContexts] : [],
    };
  }
}

module.exports = makeRes;
