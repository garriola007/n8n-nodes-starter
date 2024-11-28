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
                displayName: 'Adicional Fields',
                name: 'adicionalFields',
                type:'collection',
                default: {},
                placeholder: 'Add field',
                options: [
                    {
                        displayName: 'Format',
                        name:  'format',
                        type:'options',
                        noDataExpression: true,
                        options:[
                            {
                                name:  'Imperial',
                                value:  'imperial',
                                description: 'Fahrenheit | miles/hour',
                            },
                            {
                                name:  'Metric',
                                value:  'metric',
                                description:  'Celsius | meters/sec',
                            },
                            {
                                name: 'Scientific',
                                value:'standar',
                                description:  'Kelvin  | meters/sec',
                            },
                        ],
                        default:'metric',
                        description: 'The format in which format the data should be returned',
                        routing: {
                            request: {
                                qs: {
                                    units:  '={{$value}}',
                                },
                            },
                        },
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
