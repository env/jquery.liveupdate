// Original code from: http://ejohn.org/blog/jquery-livesearch/
// modified to allow searched item to be different than item 
// whose visibility is toggled

// Usage 

// Add in the plugin with the following files:

//  <script type="text/javascript" src="jquery.liveupdate/quicksilver.js"></script>                            
//  <script type="text/javascript" src="jquery.liveupdate/jquery.liveupdate.js"></script>  

// Example:           search in one <td> of table row but hide/show its entire containing <tr>
// 
// input:             #search_box
// list:              table#checkin tbody of a table
// selectorToToggle:  (table#checkin tbody) tr 
// selectorToSearch   (table#checkin tbody tr) .last_name (will search on this item's .text() )
// 
// <table>
//  <tbody>
//    <tr>
//     <td class='last_name'>Smith</td>
//     <td class='age'>Age</td>
//    </tr>
// </tbody>
// </table>

// $('input#search_box').liveUpdate('table#checkin tbody', 'tr', '.last_name')

jQuery.fn.liveUpdate = function(list, selectorToToggle, selectorToSearchOn){
	list = jQuery(list);
	  
	if ( list.length ) {
		var rows = list.children(selectorToToggle),
		
    		cache = rows.map(function(){
    			return jQuery(this).find(selectorToSearchOn).text().toLowerCase();
    		});
		
		
		this
			.keyup(filter).keyup()
			.parents('form').submit(function(){
				return false;
			});
	}
		
	return this;
		
	function filter(){
		var term = jQuery.trim( jQuery(this).val().toLowerCase() ), scores = [];
		
		if ( !term ) {
			rows.show();
		} else {
			rows.hide();

			cache.each(function(i){
				var score = this.score(term);
				if (score > 0) { scores.push([score, i]); }
			});

			jQuery.each(scores.sort(function(a, b){return b[0] - a[0];}), function(){
				jQuery(rows[ this[1] ]).show();
			});
		}
	}
};