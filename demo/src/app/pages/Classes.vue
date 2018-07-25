<template>

  <div class="content">
    <h2 class="title is-2">Classes</h2>
    <p>This page outlines the Axios Actions class structure:</p>

    <pre>
ApiCore (axios: Axios)
 |
 +-  loading : boolean
 +-  error   : any
 +-  http    : Http (axios: Axios)
 |    |
 |    +- axios   : Axios
 |    +- before  : Array&lt;Function&gt;
 |    +- after   : Array&lt;Function&gt;
 |    +- done    : Set&lt;Function&gt;
 |    +- fail    : Set&lt;Function&gt;
 |    +- queue   : Map
 |    +- request ( instance: Api, method: string, path: string, data:any )
 |
 +-  use     ( name:string, ...params ) : Api
 +-  request ( verb: string, path: string, data?: any ) : Promise
 +-  get     ( path: string, data?: any ) : Promise
 +-  post    ( path: string, data?: any ) : Promise
 +-  done    ( callback: Function ) : Api
 +-  fail    ( callback: Function ) : Api
 |
 +-  ApiGroup ( axios: Axios, actions: any = null )
      |
      +-  actions : ActionMap (actions: object)
      |    |
      |    +- map    : any
      |    +- add    ( name: string, path: string, method: string = 'get' )
      |    +- remove ( name: string )
      |    +- get    ( name )
      |
      +-  add  ( action: string, path : string ) : ApiGroup
      +-  call ( action: string, data?: any ) : Promise
      |
      +-  ApiEndpoint ( axios: Axios, config: string | object )
           |
           +- index  ( ) : Promise
           +- create ( data: any ) : Promise
           +- read   ( data: any ) : Promise
           +- update ( data: any ) : Promise
           +- delete ( data: any ) : Promise
           |
           +-  ApiResource( axios: Axios, config: string | object, model: any )
                |
                +- search ( data: any ) : Promise
    </pre>

  </div>

</template>
