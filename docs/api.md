# API

> [Home](README.md) &gt; Actions Config

## Classes

```
+- ApiCore (axios: Axios)
    |
    +-  loading : boolean
    +-  error   : any
    +-  http    : Http
    |    |
    |    +- axios   : Axios
    |    +- before  : Array<Function>
    |    +- after   : Array<Function>
    |    +- done    : Set<Function>
    |    +- fail    : Set<Function>
    |    +- queue   : Map
    |    +- request ( instance: ApiCore, config: AxiosRequestConfig, data: any )
    |
    +-  use     ( name:string, ...params ) : Api
    +-  request ( config: AxiosRequestConfig, data?: any ) : Promise
    +-  get     ( url: string, data?: any ) : Promise
    +-  post    ( url: string, data?: any ) : Promise
    +-  done    ( callback: Function ) : Api
    +-  fail    ( callback: Function ) : Api
    |
    +- ApiGroup ( axios: Axios, actions: any = null )
        |
        +-  actions : ActionMap
        |    |
        |    +- map           : object
        |    +- get           ( name: string )
        |    +- add           ( name: string, url: string, method: string = 'get', handler: Function = null )
        |    +- remove        ( name: string )
        |    +- addHandler    ( name: string, handler: Function )
        |    +- removeHandler ( name: string, handler: Function )
        |
        +-  add  ( action: string, url : string, method: string = 'get', handler: Function = null ) : ApiGroup
        +-  when (name: string, callback: Function) : ApiGroup
        +-  call ( action: string, data?: any ) : Promise
        |
        +- ApiEndpoint ( axios: Axios, config: string | object )
            |
            +- index  ( ) : Promise
            +- create ( data: any ) : Promise
            +- read   ( data: any ) : Promise
            +- update ( data: any ) : Promise
            +- delete ( data: any ) : Promise
            |
            +- ApiResource( axios: Axios, config: string | object, model: any )
                |
                +- search ( data: any ) : Promise
```

