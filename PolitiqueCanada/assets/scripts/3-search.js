"use strict";

/**
 * Fichier permettant de gérer l'affichage d'un résultat de recherche sur la carte.
 */


/**
 * Permet d'effectuer un zoom automatique sur la circonscription recherchée afin de la mettre en évidence.
 *
 * @param map           La carte Leaflet.
 * @param g             Le groupe dans lequel les tracés des circonscriptions ont été créés.
 * @param districtId    Le numéro de la circonscription.
 * @param bound         La borne a été utiliser pour réaliser un zoom sur la région.
 * @param showPanel     La fonction qui doit être appelée pour afficher le panneau d'informations.
 *
 * @see http://leafletjs.com/reference-0.7.7.html#map-fitbounds
 */
function search(map, g, districtId, bound, showPanel) {
  /* TODO: Effectuer un zoom en utilisant la fonction "fitBounds" de Leaflet en respectant les contraintes suivantes:
       - Le niveau de zoom maximum doit être de 8;
       - Le pan doit être animé (durée de 1s et "easeLinearity" de 0.5s);
       - Le zoom doit être animé.

      Sélectionner la zone recherchée en lui appliquant la classe "selected". De plus, afficher le panneau d'informations
      pour cette circonscription en faisant appel à la fonction "showPanel".
   */

   g.selectAll("path").attr("class",function(d){
   	
   	if(d.properties.NUMCF == districtId)
   		return "selected";
   	else
   		return "";
   
   });
   showPanel(districtId);
	/*map.setView({ lat: (bound[1][0]+bound[0][0])/2,
				lng: (bound[1][1]+bound[0][1])/2 }
		,map.getBoundsZoom(bound)
		,{ "animate": true,
		"pan": {"duration": 1000,"easeLinearity":500} });*/
	map.fitBounds(bound,{animate: true, maxZoom: 8, pan: { animate: true, duration: 1, easeLinearity: 0.5 }})
}
