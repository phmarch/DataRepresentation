"use strict";

/**
 * Fichier permettant de dessiner le diagramme à cordes.
 */


/**
 * Crée les groupes du diagramme à cordes
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param arc             Fonction permettant de dessiner les arcs.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la souris.
  */

  g.selectAll(".arc")
   .data(layout.groups)
   .enter()
   .append("g")
   .attr("class", "arc")
   .append("path")
      .attr("id",function(d,i){return "arc_" + i;})
      .attr("d", arc)
      .attr("fill", function(d,i){ 
        return color((data[i]).name)});
      
  g.selectAll(".arc")
     .data(layout.groups)
     .append("text")
      .attr("dy",14)
      .attr("dx",10)
      .style("fill", "white")
      .style("font-size","12px")
      .style("text-anchor", "left")
      .append("textPath")
      .attr("xlink:href",function(d,i){return "#arc_" + i;})
      .text(function(d,i){
        var pathLength = (d.endAngle - d.startAngle)*266;
        var stationName = (data[i]).name;
        var textLength = 6*(stationName.length);
        if(pathLength<textLength){
          stationName = stationName.split(/[/(]/)[0];
        }
        return stationName;
      });

      g.selectAll(".arc")
          .data(layout.groups)
          .append("title")
            .text(function(d,i){
              return (data[i]).name + ": " 
              + formatPercent( d3.sum( data[i].destinations, function(d) {return d.count;} ) /total) 
              +" des départs";
            });

}

/**
 * Crée les cordes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param path            Fonction permettant de dessiner les cordes.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 85%.
     - Afficher un élément "title" lorsqu'une corde est survolée par la souris.
  */

g.selectAll(".chord").data(layout.chords)
  .enter()
  .append("path")
  .attr("class", "chord") 
    .attr("id",function(d,i){return "chord_" + i;})

    .attr("d", path)
    .attr("fill", function(d,i){ 
      return color((data[d.source.index]).name)})
    .attr("fill-opacity",0.85)
    .on('mouseover',function(d){
       d3.select(this).attr("fill-opacity", 0.95);
    })
    .on('mouseout',function(d){
       d3.select(this).attr("fill-opacity", 0.85);
    })
    .append("title")
    .text(function(d){
      var i = d.source.index;
      var j = d.target.index;
      return    data[i].name 
              + " → " 
              + data[j].name
              + "  "
              + formatPercent( data[i].destinations[j].count/total) 
              + "\n"
              + data[j].name 
              + " → " 
              + data[i].name
              + "  "
              + formatPercent( data[j].destinations[i].count/total) 
    });

}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - Lorsqu'un groupe est survolé par la souris, afficher les cordes entrant et sortant de ce groupe avec une
       opacité de 85%. Toutes les autres cordes doivent être affichées avec une opacité de 10%.
     - Rétablir l'affichage du diagramme par défaut lorsque la souris sort du cercle du diagramme.
  */

}

