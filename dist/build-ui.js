var request = new XMLHttpRequest();
request.open("GET", "/public_html/v2.json", false)
request.send();
var swagger_json = JSON.parse(request.responseText);
console.log(swagger_json);

var title="<!-- react-text: 54 -->"+swagger_json.info.title+"<!-- /react-text -->";
var version='<pre class="version"><!-- react-text: 57 --> <!-- /react-text --><!-- react-text: 58 -->'+swagger_json.info.version+'<!-- /react-text --><!-- react-text: 59 --> <!-- /react-text --></pre>';
var basePath='<pre class="base-url"><!-- react-text: 61 -->[ Base URL: <!-- /react-text --><!-- react-text: 62 -->'+swagger_json.host+'<!-- /react-text --><!-- react-text: 63 -->'+swagger_json.basePath+'<!-- /react-text --><!-- react-text: 64 --> ]<!-- /react-text --></pre>';
var url= '<!-- react-text: 67 --> <!-- /react-text --><!-- react-text: 68 -->http://'+swagger_json.host+''+swagger_json.basePath+'/swagger.json<!-- /react-text --><!-- react-text: 69 --> <!-- /react-text -->';
var description ='<p>'+swagger_json.info.description+'</p>'
var term='<div><a target="_blank" href="'+swagger_json.info.termOfService+'">Terms of service</a></div>'
var mail='<div><a href="mailto:'+swagger_json.info.contact.email+'">Contact the developer</a></div>'
var license='<div><a target="_blank" href="'+swagger_json.info.license.url+'">'+swagger_json.info.license.name+'</a></div>'
var schemes=''
var parametres_fin=""


for (var i = swagger_json.schemes.length - 1; i >= 0; i--) {
      schemes=schemes.concat("<option value="+swagger_json.schemes[i]+">http</option>");
};

var tags = [];
var core='';
for (var i = 0; i < swagger_json.tags.length ; i++) {
   tags[i]=swagger_json.tags[i].name;
};
console.log()
var longueur_obj=0;
var cpt=0;
for (var i = 0; i < swagger_json.tags.length ; i++) {
         core=core.concat(`<div class="wrapper">
            <section class="block col-12 block-desktop col-12-desktop">
               <div>
                  <div class="opblock-tag-section is-open">
                     <h4 class="opblock-tag" id="operations-tag-`+tags[i]+`">`);
         var entete =`<a class="nostyle" href="#/`+tags[i]+`"><span>`+tags[i]+`</span></a>
                        <small>
                           <div class="markdown">`+swagger_json.tags[i].description+`</div>
                        </small>`;
         if (swagger_json.tags[i].hasOwnProperty('externalDocs')) {
            var option = `<div>
                              <small>
                                 <!-- react-text: 98 -->`+swagger_json.tags[i].externalDocs.description+`<!-- /react-text --><!-- react-text: 99 -->: <!-- /react-text --><a href=""`+swagger_json.tags[i].externalDocs.url+`"" target="_blank">`+swagger_json.tags[i].externalDocs.url+`</a>
                              </small>
                           </div>`;
         } else {
            var option='';
         }
         core=core.concat(entete, option, `<button class="expand-operation" title="Collapse operation">
                           <svg class="arrow" width="20" height="20">
                              <use href="#large-arrow-down" xlink:href="#large-arrow-down"></use>
                           </svg>
                        </button>
                     </h4>                     
                     <div style="height: auto; border: medium none; margin: 0px; padding: 0px;">
                        <!-- react-text: 105 --> <!-- /react-text -->`);
         
         
         var consumes = "";
         var responses = ""
         var parametres="";
         while(String(Object.keys(swagger_json.paths)[longueur_obj]).match(new RegExp("^\/"+swagger_json.tags[i].name)) ){
            longueur_obj++;
         }
         var parametres_final=""
         var fermer_param = "";
         while(cpt < longueur_obj){
            var array = Object.values(swagger_json.paths);
               for (var j = 0; j < Object.values(array[cpt]).length; j++) {
                  var keys_obj=Object.values(array[cpt])[j]
                  var firstStep =``;
                  if(keys_obj.hasOwnProperty("deprecated")){
                     firstStep=firstStep.concat(`<div class="opblock opblock-deprecated">
                           <div class="opblock-summary opblock-summary-`+Object.keys(array[cpt])[j]+`">
                           <span class="opblock-summary-method">`+Object.keys(array[cpt])[j]+`</span>
                           <span class="opblock-summary-path__deprecated">
                        <a class="nostyle"><span>`+Object.keys(swagger_json.paths)[cpt]+`</span></a><!-- react-empty: 112 --><!-- react-text: 113 --> <!-- /react-text -->
                     </span>`);
                  } else {
                     firstStep=firstStep.concat(`<div class="opblock opblock-`+Object.keys(array[cpt])[j]+` is-open">
                           <div class="opblock-summary opblock-summary-`+Object.keys(array[cpt])[j]+`">
                              <span class="opblock-summary-method">`+Object.keys(array[cpt])[j]+`</span>
                              <span class="opblock-summary-path">
                                 <a class="nostyle"><span>`+Object.keys(swagger_json.paths)[cpt]+`</span></a><!-- react-empty: 112 --><!-- react-text: 113 --> <!-- /react-text -->
                              </span>`);
                  }
                  for (var v = 0; v < Object.keys(Object.values(array[cpt])[j]).length; v++) {
                     if (String(Object.keys(Object.values(array[cpt])[j])[v]).trim() === "summary") {
                        var secondStep=`<div class="opblock-summary-description">`+Object.values(array[cpt])[j].summary+`</div>
                                 <button class="authorization__btn unlocked" aria-label="authorization button unlocked">
                                    <svg width="20" height="20">
                                       <use href="#unlocked" xlink:href="#unlocked"></use>
                                    </svg>
                                 </button>
                              </div>`;
                     };
                    
                     if (String(Object.keys(Object.values(array[cpt])[j])[v]).trim() === "parameters" ) {
                        if (Object.values(Object.values(array[cpt])[j].parameters).length == 0) {
			   fermer_param =`
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>`;

                           parametres =` <div style="height: auto; border: medium none; margin: 0px; padding: 0px;">
                              <!-- react-text: 1089 --> <!-- /react-text -->
                              <div class="opblock-body">
                                 <div class="opblock-description-wrapper">
                                    <div class="opblock-description">
                                       <div class="markdown">Returns a map of status codes to quantities</div>
                                    </div>
                                 </div>
                                 <div class="opblock-section">
                                    <div class="opblock-section-header">
                                       <div class="tab-header">
                                          <h4 class="opblock-title">Parameters</h4>
                                       </div>
                                       <div class="try-out"><button class="btn try-out__btn">Try it out </button></div>
                                    </div>
                                    <div class="opblock-description-wrapper">
                                       <p>No parameters</p>
                                    </div>
                                 </div>`
                        } else {
                                              fermer_param =` </div>
                                                   </div>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>`;
                                var params = Object.values(Object.values(array[cpt])[j].parameters)[0];
                           
                              parametres =`                           <div style="height: auto; border: medium none; margin: 0px; padding: 0px;">
                                    <!-- react-text: 421 --> <!-- /react-text -->
                                    <div class="opblock-body">
                                       <!-- react-text: 426 --><!-- /react-text -->
                                       <div class="opblock-section">
                                          <div class="opblock-section-header">
                                             <div class="tab-header">
                                                <h4 class="opblock-title">Parameters</h4>
                                             </div>
                                             <div class="try-out"><button class="btn try-out__btn">Try it out </button></div>
                                          </div>
                                          <div class="table-container">
                                             <table class="parameters">
                                                <thead>
                                                   <tr>
                                                      <th class="col col_header parameters-col_name">Name</th>
                                                      <th class="col col_header parameters-col_description">Description</th>
                                                   </tr>
                                                </thead>
                                                <tbody>
                                                <tr>`
                              var inn=""
                              var name=""
                              var type=""
                              var format=""
                              var deprecated=""
                              var desc=""
                              var enume=""
                              if (params.hasOwnProperty('in')) {
                                 inn = params.in
                              };
                              if (params.hasOwnProperty('name')) {
                                 name = params.name
                              };
                              if (params.hasOwnProperty('type')) {
                                 type = params.type
                              };
                              if (params.hasOwnProperty('format')) {
                                format = params.type
                              };

                              if (params.hasOwnProperty('deprecated')) {
                                 deprecated = params.deprecated
                              };
                              if (params.hasOwnProperty('description')) {
                                 
                                 desc = params.description
                              };
                              if (params.hasOwnProperty('items')) {
                                 if (params.items.hasOwnProperty('enum')) {
                                    enume="<p><i>Available values</i> :"
                                    for(var cpt_enum=0;cpt_enum<Object.values(params.items.enum).length;cpt_enum++){
                                       if(cpt_enum<Object.values(params.items.enum).length-1){
                                          enume=enume.concat(" "+Object.values(params.items.enum)[cpt_enum]+",")
                                       } else {
                                          enume=enume.concat(" "+Object.values(params.items.enum)[cpt_enum]+"</p>")
                                       }
                                          
                                    }
                                    
                                 }
                              };
                              parametres=parametres.concat(`<td class="col parameters-col_name">
                                                   <div class="parameter__name required">
                                                      <!-- react-text: 517 -->`+name+`<!-- /react-text --><span style="color: red;">&nbsp;*</span>
                                                   </div>
                                                   <div class="parameter__type">`+type+`</div>
                                                   <div class="parameter__deprecated">`+deprecated+`</div>
                                                   <div class="parameter__in">
                                                      <!-- react-text: 522 -->(<!-- /react-text --><!-- react-text: 523 -->`+inn+`<!-- /react-text --><!-- react-text: 524 -->)<!-- /react-text -->
                                                   </div>
                                                </td>
                                                <td class="col parameters-col_description">
                                                   <div class="markdown">`+desc+`</div>
                                                   <div class="parameter__enum markdown">
                                                      `+enume+`
                                                   </div>`);
                              if (params.hasOwnProperty('schema')) {
                                 parametres=parametres.concat(`<div>
                                                            <ul class="tab">
                                                               <li class="tabitem active"><a class="tablinks" data-name="example">Example Value</a></li>
                                                               <li class="tabitem"><a class="tablinks" data-name="model">Model</a></li>
                                                            </ul>
                                                            <div>
                                                               <div class="body-param">
                                                                  <div class="highlight-code">`);
                                 var nom_objet = "";
                                 if(Object.keys(params.schema).length == 1){
                                    Object.values(swagger_json.definitions).forEach(function(def) {
                                          var ref = Object.values(params.schema)[0];
                                          var ob = ref.split('/'); 
                                          if (ref.match(ob[ob.length-1])){
                                                nom_objet = ob[ob.length-1];
                                                
                                          };
                                    });

                                 parametres=parametres.concat(`<pre class="body-param__example microlight"><span style="">{</span><span style="color: #555; font-weight: bold;">
	</span>`);
                                 schema("", nom_objet, 0, 0);
                                 
                                 parametres=parametres.concat(parametres_fin+`
                                    </div>`);
                                 } else {
                                    Object.values(swagger_json.definitions).forEach(function(def) {
                                          var ref = Object.values(params.schema.items)[0];
                                          var ob = ref.split('/'); 
                                          if (ref.match(ob[ob.length-1])){
                                                nom_objet = ob[ob.length-1];
                                                
                                          };
                                    });
                                    /*parametres=parametres.concat(`<pre class="body-param__example microlight"><span style="">"["</span><span style="color: #555; font-weight: bold;">
       </span>*/
                                       parametres=parametres.concat(`<span style="">{</span><span style="color: #555; font-weight: bold;">
	</span>`);
                                 schema("", nom_objet, 0, 0);
                                 
                                 parametres=parametres.concat(parametres_fin+`
                                    </div>`);

                                   /*parametres=parametres.concat(`<span style="">"]"</span><span style="color: #555; font-weight: bold;">
       </span>`);*/
                                 }
                                 
                              };
                           }
                              
                     }
                     if (String(Object.keys(Object.values(array[cpt])[j])[v]).trim() === "consumes") {

                        consumes =`                              <div class="body-param-options">
                                                            <label for="">
                                                               <span>Parameter content type</span>
                                                               <div class="content-type-wrapper body-param-content-type">
                                                                  <select class="content-type">`
                        for (var z = 0; z < Object.values(Object.values(array[cpt])[j])[v].length; z++) {
                        consumes=consumes.concat(`                                            <option value=`+Object.values(Object.values(array[cpt])[j])[v][z]+`>`+Object.values(Object.values(array[cpt])[j])[v][z]+`</option>`);
                        }
                        consumes=consumes.concat(`                                          </select>
                                                               </div>
                                                            </label>
                                                         </div>`);
                     }

                     if (String(Object.keys(Object.values(array[cpt])[j])[v]).trim() === "produces") {

                        produces =`                                                                         <div class="content-type-wrapper execute-content-type">
                                             <select class="content-type">`;
                                          
                                             
                        for (var z = 0; z < Object.values(Object.values(array[cpt])[j])[v].length; z++) {
                        produces=produces.concat(`                                            <option value=`+Object.values(Object.values(array[cpt])[j])[v][z]+`>`+Object.values(Object.values(array[cpt])[j])[v][z]+`</option>`);
                        }
                        produces=produces.concat(`                                          </select>
                                          </div>`);
                     };


                     if (String(Object.keys(Object.values(array[cpt])[j])[v]).trim() === "responses") {
                        responses =`<div class="execute-wrapper"></div>
                                 <div class="responses-wrapper">
                                    <div class="opblock-section-header">
                                       <h4>Responses</h4>
                                       <label>
                                          <span>Response content type</span>
                                          `+produces+`
                                       </label>
                                    </div>
                                    <div class="responses-inner">
                                       <table class="responses-table">
                                          <thead>
                                             <tr class="responses-header">
                                                <td class="col col_header response-col_status">Code</td>
                                                <td class="col col_header response-col_description">Description</td>
                                             </tr>
                                          </thead>
                                          <tbody>`;
                        var tableau = Object.values(Object.values(Object.values(array[cpt])[j])[v]);
                        
                        for (var z = 0; z < tableau.length; z++) {
                           if (tableau[z].hasOwnProperty('schema')) {
                               responses=responses.concat(`<tr class="response ">
                                                <td class="col response-col_status">`+Object.keys(Object.values(Object.values(array[cpt])[j])[v])[z]+`</td>
                                                <td class="col response-col_description">
                                                   <div class="response-col_description__inner">
                                                      <div class="markdown">`+Object.values(Object.values(Object.values(Object.values(Object.values(array[cpt])[j])[v])[z]))[0]+`</div>
                                                   </div>
                                                   <div class="response-content-type">
                                                      <!-- react-empty: 720 -->
                                                   </div>
                                                   <div>
                                                      <ul class="tab">
                                                         <li class="tabitem active"><a class="tablinks" data-name="example">Example Value</a></li>
                                                         <li class="tabitem"><a class="tablinks" data-name="model">Model</a></li>
                                                      </ul>
                                                      <div>
                                                         <div>
                                                            <div class="highlight-code">`);
                              var nom_objet = "";
                             console.log(Object.keys(tableau[z].schema).length)
                              if(Object.keys(tableau[z].schema).length == 1){
                                 if(String(Object.keys(tableau[z].schema)[0]).trim() === '$ref'){
                                    Object.values(swagger_json.definitions).forEach(function(def) {
                                             var ref = Object.values(tableau[z].schema)[0];
                                             var ob = ref.split('/'); 
                                             if (ref.match(ob[ob.length-1])){
                                                   nom_objet = ob[ob.length-1];
                                                   
                                             };
                                    });
                                 }
                              } else if(Object.keys(tableau[z].schema).length >= 2){
                                    if (String(Object.values(tableau[z].schema)[0]).trim() === "array") {
                                       Object.values(swagger_json.definitions).forEach(function(def) {
                                             var ref = Object.values(tableau[z].schema.items)[0];
                                             var ob = ref.split('/'); 
                                             if (ref.match(ob[ob.length-1])){
                                                   nom_objet = ob[ob.length-1];
                                             };
                                       });
                                 };
                              }
                              if (nom_objet != ""){
                                 
                              responses=responses.concat(`<pre class="body-param__example microlight"><span style="">{</span><span style="color: #555; font-weight: bold;">
	</span>`);
                              schema("", nom_objet, 0, 0);
                                                               
                              responses=responses.concat(parametres_fin+`</div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </td>
                                             </tr>`)
                              }
                              
                           } else {
                              responses=responses.concat(`<tr class="response ">
                                             <td class="col response-col_status">`+Object.keys(Object.values(Object.values(array[cpt])[j])[v])[z]+`</td>
                                             <td class="col response-col_description">
                                                <div class="response-col_description__inner">
                                                   <div class="markdown">`+Object.values(Object.values(Object.values(Object.values(Object.values(array[cpt])[j])[v])[z]))[0]+`</div>
                                                </div>
                                                <div class="response-content-type">
                                                   <!-- react-empty: 565 -->
                                                </div>
                                             </td>
                                          </tr>`);
                           }
                        }

                        responses=responses.concat(`                                         </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                              <!-- react-text: 499 --> <!-- /react-text -->
                           </div>
                           </div>`);
                     }
                  
                  } 
                  
                  parametres_final=parametres_final.concat(firstStep, secondStep, parametres, fermer_param, consumes, responses); 
            }
            
            
          cpt++;  
         }
        
   core=core.concat(parametres_final);
};


function schema(parametres, nom_objet, cpt_properties, cpt_models){
   var final =""
   var tab_properties = Object.keys(swagger_json.definitions[nom_objet].properties);
   var tab_model = Object.keys(swagger_json.definitions);
   if (cpt_properties < tab_properties.length) {
      if(cpt_models < tab_model.length-1){
         var o = tab_properties[cpt_properties].replace(new RegExp('^'+tab_properties[cpt_properties][0]+''), tab_properties[cpt_properties][0].toUpperCase());   
         if (String(tab_model[cpt_models]).trim() === o.trim()) {
            parametres = parametres.concat(ecrire_param("", o, false));
            schema(parametres, nom_objet, cpt_properties+1, 0);
         } else {
            schema(parametres, nom_objet, cpt_properties, cpt_models+1);
         }
      } else {
         parametres=parametres.concat(`<span style="color: #555;">`+Object.keys(swagger_json.definitions[nom_objet].properties)[cpt_properties]+`</span><span style="">:</span><span style="color: #555; font-weight: bold;"> </span>`);
         var tab = Object.values(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties]);
         var ob ="";
         for (var i = 0; i < tab.length; i++) {
            if (String(Object.values(tab)[i]).trim() === "integer") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">0</span>`);
            } else if (String(Object.values(tab)[i]).trim() === "string") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">`+Object.values(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties])[i]+`</span>`);
            } 
            if (String(Object.keys(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties])[i]).trim() === "example") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">`+Object.values(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties])[i]+`</span>`);
            } 
            if (String(Object.keys(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties])[i]).trim() === "items") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	</span><span style="">[</span>`);
               var tab_items = Object.values(Object.values(swagger_json.definitions[nom_objet].properties)[cpt_properties])[i];
               if (Object.keys(tab_items)[0] == "type"){
                  parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	  </span><span style="color: #555; font-weight: bold;">`+Object.values(tab_items)[0]+`</span>`);
               } else {
                  var ob = Object.values(tab_items)[0].split('/');
                  parametres = parametres.concat(ecrire_param("", ob[ob.length-1], true));
               };
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	</span><span style="">]</span><span style="color: #555; font-weight: bold;">`);
               
            };
         };
         if (cpt_properties < tab_properties.length-1){
               parametres=parametres.concat(`<span style="">,</span><span style="color: #555; font-weight: bold;">
	</span>`);
            } else {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	</span><span style="">}</span>`);
            };
         schema(parametres, nom_objet, cpt_properties+1, 0);
      };
   } else {
      parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
</span><span style="">}</span></pre>`);
      
   };
   if (cpt_properties == tab_properties.length){
      parametres_fin = parametres;
   };
}

function ecrire_param(parametres, o, estArray){
   var tab_properties2 = Object.keys(swagger_json.definitions[o].properties);
   if (!estArray) {
      parametres=parametres.concat(`<span style="color: #555;">`+o+`</span><span style="">:</span><span style="">{</span><span style="color: #555; font-weight: bold;"> 
	</span>`);
   };   
   for (var i = 0; i < tab_properties2.length; i++) {
      if (i < tab_properties2.length) {
         parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	  </span><span style="color: #555;">`+Object.keys(swagger_json.definitions[o].properties)[i]+`</span><span style="">:</span><span style="color: #555; font-weight: bold;"> </span>`);
         var tab = Object.values(Object.values(swagger_json.definitions[o].properties)[i]);
         var ob ="";
         for (var j = 0; j < tab.length; j++) {
            if (String(Object.values(tab)[j]).trim() === "integer") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">0</span>`);
            } else if (String(Object.values(tab)[j]).trim() === "string") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">`+Object.values(Object.values(swagger_json.definitions[o].properties)[i])[j]+`</span>`);
            }
            if (String(Object.keys(Object.values(swagger_json.definitions[o].properties)[i])[j]).trim() === "example") {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">`+Object.values(Object.values(swagger_json.definitions[o].properties)[i])[j]+`</span>`);
            };
         };
         if (i < tab_properties2.length-1){
               parametres=parametres.concat(`<span style="">,</span><span style="color: #555; font-weight: bold;">
	</span>`);
            } else {
               parametres=parametres.concat(`<span style="color: #555; font-weight: bold;">
	</span><pan style="">}</span><span style="color: #555; font-weight: bold;">
	</span>`);
            };
      };
   };
   return parametres;
}




document.getElementById("swagger-ui").innerHTML=`<section data-reactroot="" class="swagger-ui swagger-container">
   <div class="topbar">
      <div class="wrapper">
         <div class="topbar-wrapper">
            <a class="link"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwB0lzB/n0BfhxBpjyC0x4////+qv4CJp1D09++ft3C/z5/K16/U379UfwDf58/q79+Ur2D2RCk9AAAAHXRSTlMAEEAwn9//z3Agv4/vYID/////////////////UMeji1kAAAD8SURBVHgBlZMFAoQwDATRxbXB7f+vPKnlXAZn6k2cf3A9z/PfOC8IIYni5FmmABM8FMhwT17c9hnhiZL1CwvEL1tmPD0qSKq6gaStW/kMXanVmAVRDUlH1OvuuTINo6k90Sxf8qsOtF6g4ff1osP3OnMcV7d4pzdIUtu1oA4V0DZoKmxmlEYvtDUjjS3tmKmqB+pYy8pD1VPf7jPE0I40HHcaBwnue6fGzgyS5tXIU96PV7rkDWHNLV0DK4FkoKmFpN5oUnvi8KoeA2/JXsmXQuokx0siR1G8tLkN6eB9sLwJp/yymcyaP/TrP+RPmbMMixcJVgTR1aUZ93oGXsgXQAaG6EwAAAAASUVORK5CYII=" alt="Swagger UI" height="30" width="30"><span>swagger</span></a>
            <form class="download-url-wrapper"><input class="download-url-input" value="" style="" type="text"><button class="download-url-button button">Explore</button></form>
         </div>
      </div>
   </div>
   <div class="swagger-ui">
      <div>
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px;">
            <defs>
               <symbol viewBox="0 0 20 20" id="unlocked">
                  <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>
               </symbol>
               <symbol viewBox="0 0 20 20" id="locked">
                  <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"></path>
               </symbol>
               <symbol viewBox="0 0 20 20" id="close">
                  <path d="M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697.469-.469 1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0 .469.469.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c.469.469.469 1.229 0 1.698z"></path>
               </symbol>
               <symbol viewBox="0 0 20 20" id="large-arrow">
                  <path d="M13.25 10L6.109 2.58c-.268-.27-.268-.707 0-.979.268-.27.701-.27.969 0l7.83 7.908c.268.271.268.709 0 .979l-7.83 7.908c-.268.271-.701.27-.969 0-.268-.269-.268-.707 0-.979L13.25 10z"></path>
               </symbol>
               <symbol viewBox="0 0 20 20" id="large-arrow-down">
                  <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"></path>
               </symbol>
               <symbol viewBox="0 0 24 24" id="jump-to">
                  <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"></path>
               </symbol>
               <symbol viewBox="0 0 24 24" id="expand">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
               </symbol>
            </defs>
         </svg>
      </div>
      <div>
         <!-- react-empty: 41 -->
         <div class="information-container wrapper">
            <section class="block col-12">
               <div class="info">
                  <hgroup class="main">
                     <h2 class="title">
                        `+title+`
                        <small>
                           `+version+`
                        </small>
                     </h2>
                     	`+basePath+`
                     <a target="_blank" href="http://"+swagger_json.host"+"swagger_json.basePath+"/swagger.json">
                        <span class="url">
                         	`+url+`
                        </span>
                     </a>
                  </hgroup>
                  <div class="description">
                     <div class="markdown">
                        `+description+`
                     </div>
                  </div>
                  	`+term+`
                  	`+mail+`
                  	`+license+`
               </div>
            </section>
         </div>
         <div class="scheme-container">
            <section class="schemes wrapper block col-12">
               <label for="schemes">
                  <span class="schemes-title">Schemes</span>
                  <select>
                     `+schemes+`
                  </select>
               </label>
               <div class="auth-wrapper">
                  <button class="btn authorize unlocked">
                     <span>Authorize</span>
                     <svg width="20" height="20">
                        <use href="#unlocked" xlink:href="#unlocked"></use>
                     </svg>
                  </button>
               </div>
            </section>
         </div>
               `+core+`
               </div>
               </div>
            </section>
         </div>
         </div>

      </div>
    </div>
</section>`;
