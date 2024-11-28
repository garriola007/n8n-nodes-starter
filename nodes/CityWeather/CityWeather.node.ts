import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CityWeather implements INodeType{ 
    description: INodeTypeDescription = {
        // Basic node details will go here
        displayName: 'City Weather',
        name: 'CityWeather',
        icon: 'file:nasapics.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from OpenWeatherMap API',
        defaults: {
            name: 'City Weather default',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'CityWeatherApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            // Resources and operations will go here
            {
                displayName: 'City',
                name: 'CityName',
                type: 'string',
                default: '',
                placeholder: 'honolulu',
                required: true,
                description: 'The name of the city to return of the weather of',
                routing: {
                    request: {
                        qs: {
                            q: '={{$value}}',
                        },
                    },
                },
            },      
        {
            displayname: 'Adicional Fields',
            name: 'adicionalFields',
            type:'collection',
            default: {},
            placeholder: 'Add field',
            options: [
                {
                    displayName: 'Format',
                    name:  'format',
                    type:'options',
                    options:[
                        {
                            name:  'Imperial',
                            label:  'imperial',
                            description: 'Fahrenheit | miles/hour',
                        },
                        {
                            name:  'Metric',
                            label:  'metric',
                            description:  'Celsius | meters/sec',
                        },
                        {
                            name: 'Scientific',
                            label:'standar',
                            description:  'Kelvin  | meters/sec',
                         },
                     ],
                 },
                 {
                    displayName:'Language',
                    name:'language',
                    type:'string',
                    default:'',
                    placeholder: 'en',
                    description: 'The two letter language code to use for the response. Default is  English, which will use the units specified in your location setting.',
                    routing:{
                        request:{
                            qs:{
                              lang:'={{$value}}'
                            },
                        },
                    },
                  },
                ],
            },
        ],
    };
}
