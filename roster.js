$(document).ready(function () {

  var games;
  
  function load() {
    var roster = $("#roster");
    roster.empty();
    
    games = loadRoster();
    if (!games) {
      roster.text("Err...no local storage");
      return;
    }
    $.each(games, function (key, c) {
      var name = c.Traits.Name;

      var br = brag(c);
      roster.append(br);
      br.find("a.go").attr("href", "main.html#" + name);

      br.find("a.x").click(function () {
        if (confirm("Terminate " + Pick(["faithful","noble","loyal","brave"])+ 
                    " " + name + "?")) {
          delete games[name];
          storeRoster(games);
          load();
        }
      });
 
      /*
      var p = $("<p style='font:6pt verdana'/>");
      p.appendTo(roster);
      p.text(JSON.stringify(c));
      */
    });
  }

  load();
  
  $("#roll").click(function () {
    window.location = "newguy.html";
  });
  
  $("#test").click(function () {
    var n = GenerateName();
    games[n] = {Traits: {Level: -10,Name:n,Race:GenerateName(),
                         Class:GenerateName()},
                Stats: {best: "STR 99"},
                Plots: {last: "Act VII"},
                Spells: {best: "Bad Schwarma XIV"},
                Equips: {best: "Cottonwood Sollerets"}};
    storeRoster(games);
    load();
  });
  
  function brag(sheet) {
    var tmpl = $("#badge").html();
    var brag = tmpl.replace(/\$([A-Za-z.]+)/g, function (str, p1) {
      var dict = sheet;
      $.each(p1.split("."), function (i,v) {
        if (!dict) return true;
        dict = dict[v];
        return null;
      });
      return dict || '';
    });
    brag = $(brag);
    if (sheet.motto) 
      brag.find(".bs").text('"' + sheet.motto + '"');
    return brag;
  }
  
  $("#clear").click(function () {
    storeRoster({});
    load();
  });
});
