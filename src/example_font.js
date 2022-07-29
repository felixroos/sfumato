const font = {
  metaData: {
    name: 'Earthbound NEW',
    author: 'Juicestain',
    version: '2.1',
    copyright: '2019',
    soundEngine: 'EMU8000',
    comments:
      'lel it took 8 months for sleepytimejesse to make his earthbound soundfont but it only took me like a day',
    createdBy: 'Polyphone',
  },
  banks: [
    {
      presets: [
        {
          header: {
            name: 'EightMelody Piano',
            preset: 0,
            bank: 0,
            bagIndex: 0,
            library: 0,
            genre: 0,
            morphology: 0,
          },
          zones: [
            {
              keyRange: {
                lo: 0,
                hi: 127,
              },
              generators: {
                41: {
                  id: 41,
                  amount: 76,
                },
                43: {
                  id: 43,
                  range: {
                    lo: 0,
                    hi: 127,
                  },
                },
              },
              modulators: {},
              instrument: {
                header: {
                  name: 'EightMelody Piano',
                  bagIndex: 158,
                },
                zones: [
                  {
                    generators: {
                      17: {
                        id: 17,
                        amount: 0,
                      },
                      53: {
                        id: 53,
                        amount: 82,
                      },
                      54: {
                        id: 54,
                        amount: 1,
                      },
                    },
                    modulators: {},
                    sample: {
                      header: {
                        name: 'piano 2',
                        start: 506700,
                        end: 509900,
                        startLoop: 509852,
                        endLoop: 509900,
                        sampleRate: 32000,
                        originalPitch: 76,
                        pitchCorrection: -20,
                        link: 0,
                        type: 1,
                      },
                      data: {
                        0: 0,
                        1: 0,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        /* .. more presets */
      ],
    },
    /* more banks ... */
  ],
  chunk: {
    buffer: [
      /* lots of data */
    ],
    id: 'RIFF',
    length: 1890884,
    subChunks: [
      /* .. more chunks with the following structure:
          RIFF
            LIST
              ifil
              isng
              INAM
              IENG
              ICOP
              ICMT
              ISFT
              LIST
                smpl
              LIST
                phdr
                pbag
                pmod
                pgen
                inst
                ibag
                imod
                igen
                shdr
            LIST
              smpl
              LIST
                phdr
                pbag
                pmod
                pgen
                inst
                ibag
                imod
                igen
                shdr
            LIST
                phdr
                pbag
                pmod
                pgen
                inst
                ibag
                imod
                igen
                shdr 
      */
    ],
  },
  instruments: [
    {
      header: {
        name: 'Accordian',
        bagIndex: 0,
      },
      zones: [
        {
          generators: {
            17: {
              id: 17,
              amount: 0,
            },
            53: {
              id: 53,
              amount: 0,
            },
            54: {
              id: 54,
              amount: 1,
            },
          },
          keyRange: undefined,
          modulators: {},
          sample: {
            header: {
              name: 'accordian 1',
              start: 0,
              end: 6096,
              startLoop: 64,
              endLoop: 6096,
              sampleRate: 32000,
              originalPitch: 71,
              pitchCorrection: 6,
              link: 0,
              type: 1,
            },
            data: [
              /* Int16Array */
            ],
          },
        },
      ],
    },
    /* more instruments ... */
  ],
  presetData: {
    presetHeaders: [
      {
        name: 'EightMelody Piano',
        preset: 0,
        bank: 0,
        bagIndex: 0,
        library: 0,
        genre: 0,
        morphology: 0,
      },
      /* .. more headers */
    ],
    presetZones: [
      {
        generatorIndex: 0,
        modulatorIndex: 0,
      },
      /* .. more zones */
    ],
    presetModulators: [
      {
        source: 0,
        id: 0,
        amount: 0,
        amountSource: 0,
        transform: 0,
      },
    ],
    presetGenerators: [
      {
        id: 43,
        range: {
          lo: 0,
          hi: 127,
        },
      },
      {
        id: 41,
        amount: 76,
      },
      /* .. more generators */
    ],
    instrumentHeaders: [
      {
        name: 'Accordian',
        bagIndex: 0,
      },
      /* .. more instrument headers */
    ],
    instrumentZones: [
      {
        generatorIndex: 0,
        modulatorIndex: 0,
      },
      /* .. more instrument zones */
    ],
    instrumentModulators: [
      {
        source: 0,
        id: 0,
        amount: 0,
        amountSource: 0,
        transform: 0,
      },
    ],
    instrumentGenerators: [
      {
        id: 38,
        amount: -2786,
      },
      {
        id: 17,
        amount: 0,
      },
      {
        id: 54,
        amount: 1,
      },
      /* .. more instrument generators */
    ],
    sampleHeaders: [
      {
        name: 'accordian 1',
        start: 0,
        end: 6096,
        startLoop: 64,
        endLoop: 6096,
        sampleRate: 32000,
        originalPitch: 71,
        pitchCorrection: 6,
        link: 0,
        type: 1,
      },
      {
        name: 'accordian 2',
        start: 6142,
        end: 9758,
        startLoop: 9566,
        endLoop: 9758,
        sampleRate: 32000,
        originalPitch: 64,
        pitchCorrection: -19,
        link: 0,
        type: 1,
      },
      /* .. more sample headers */
    ],
  },
  presets: [
    {
      header: {
        name: 'EightMelody Piano',
        preset: 0,
        bank: 0,
        bagIndex: 0,
        library: 0,
        genre: 0,
        morphology: 0,
      },
      zones: [
        {
          instrument: {
            header: {
              name: 'EightMelody Piano',
              bagIndex: 158,
            },
            zones: [
              {
                generators: {
                  17: {
                    id: 17,
                    amount: 0,
                  },
                  53: {
                    id: 53,
                    amount: 82,
                  },
                  54: {
                    id: 54,
                    amount: 1,
                  },
                },
                keyRange: undefined,
                modulators: {},
                sample: {
                  header: {
                    name: 'piano 2',
                    start: 506700,
                    end: 509900,
                    startLoop: 509852,
                    endLoop: 509900,
                    sampleRate: 32000,
                    originalPitch: 76,
                    pitchCorrection: -20,
                    link: 0,
                    type: 1,
                  },
                  data: [
                    // Int16Array(3200)
                    /* lots of data */
                  ],
                },
              },
            ],
          },
          generators: {
            41: {
              id: 41,
              amount: 76,
            },
            43: {
              id: 43,
              range: {
                lo: 0,
                hi: 127,
              },
            },
          },
          keyRange: {
            lo: 0,
            hi: 127,
          },
          modulators: {},
        },
        /* more presets */
      ],
    },
  ],
  sampleData: [
    /* Uint8Array(1890630)*/
    /* lots of data */
  ],
  samples: [
    {
      header: {
        name: 'accordian 1',
        start: 0,
        end: 6096,
        startLoop: 64,
        endLoop: 6096,
        sampleRate: 32000,
        originalPitch: 71,
        pitchCorrection: 6,
        link: 0,
        type: 1,
      },
      data: [
        /* Int16Array(6096)*/
        /* lots of data */
      ],
    },
  ],
};
