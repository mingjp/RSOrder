
import axios from 'axios'
import qs from 'qs'
import common from '../common/common.js'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var baseUrl = common.baseUrl;
var filterUrl = function(url){
	if(url.startsWith('http')){
		return url;
	}
	return baseUrl + url;
}

export default {
	get: (opts) => new Promise((resolve, reject) => {
		
		if(opts.vm){
			opts.vm[opts.loading || 'loadingShow'] = true;
		}
		axios.get(filterUrl(opts.url), {params:opts.params}).then(function(response){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}
			resolve(response);
		}).catch(function(error){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}			
			reject(error);
		})
	}),
	post: (opts) => new Promise((resolve, reject) => {
		if(opts.vm){
			opts.vm[opts.loading || 'loadingShow'] = true;
		}
		axios({
	        method: 'POST',
	        url: filterUrl(opts.url),
	        data: qs.stringify(opts.params),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function(result){
	        if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}
			resolve(result);
		}).catch(function(error){
			if(opts.vm){
				opts.vm[opts.loading || 'loadingShow'] = false;
			}			
			reject(error);
		})
	})
}