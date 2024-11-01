var themify_SL_map_marker;!function(){"use strict";themify_SL_map_marker={init(t){this.map_box=t.map_container,this.wait_msg=!!t.wait_msg&&t.wait_msg,this.settings=t.settings,this.markers=t.markers,this.marked=[],this.previous_window=!1,this.post_marker=!1,this.suggestion=null!=t.suggestion&&t.suggestion,this.suggestion_box=null!=t.suggestion_box?t.suggestion_box:"","object"==typeof google||"object"==typeof google.maps?(this.load_map(),null!=this.markers&&this.markers.length>0&&this.marker_cluster()):this.map_box.innerHTML="Google Map API is not loaded"},load_map(){this.settings.map_width&&(this.map_box.style.width=this.settings.map_width),this.settings.map_height&&(this.map_box.style.height=this.settings.map_height),this.map=new google.maps.Map(this.map_box,this.settings.map_load),this.bounds=new google.maps.LatLngBounds,this.wait_msg&&this.wait_msg.remove()},change_map_center(t,e){this.map.setCenter(t),e&&(this.map.fitBounds(this.bounds),this.change_map_zoom(this.map.getZoom()))},change_map_zoom(t){this.map.setZoom(t>15?15:t)},add_marker(t){if("string"==typeof t.position)return;let e=!1,i=new google.maps.Marker({position:t.position,animation:google.maps.Animation.DROP,title:""});0!=t.content&&null!=t.content&&""!=t.content?(e=this.create_info_window(t.content),i.addListener("click",(function(){themify_SL_map_marker.previous_window&&themify_SL_map_marker.previous_window.close(),e.open(themify_SL_map_marker.map,this),themify_SL_map_marker.previous_window=e}))):i.addListener("click",(()=>{themify_SL_map_marker.previous_window&&themify_SL_map_marker.previous_window.close()})),i.setMap(this.map),this.bounds.extend(i.getPosition());const r={marker:i,infobox:e};return this.marked.push(r),r},marker_cluster(){for(let t=0,e=this.markers.length;t<e;++t)this.marked.push(this.add_marker(this.markers[t]));setTimeout((()=>{themify_SL_map_marker.change_map_center(themify_SL_map_marker.bounds.getCenter(),!0)}),1e3)},admin_post_marker(t){this.latlng_from_address(t,(t=>{"object"==typeof t&&(themify_SL_map_marker.post_marker&&themify_SL_map_marker.post_marker.marker.setMap(null),themify_SL_map_marker.post_marker=themify_SL_map_marker.add_marker({position:t,title:"Store Location"}),themify_SL_map_marker.change_map_center(t,!1))}))},create_info_window(t){return new google.maps.InfoWindow({content:t,maxWidth:400})},latlng_from_address(t,e){let i=new google.maps.Geocoder,r=!1;i.geocode({address:t},((t,i)=>{r=i==google.maps.GeocoderStatus.OK?t[0].geometry.location:i,"function"==typeof e?e(r):i==google.maps.GeocoderStatus.ZERO_RESULTS?alert("Please enter a valid address"):i==google.maps.GeocoderStatus.OVER_QUERY_LIMIT&&alert('Your Google Map API key reached the query limit for "Google Map Geocoder"')}))},latlng_from_marker(t){return{lat:t.position.lat(),lng:t.position.lng()}}}}();