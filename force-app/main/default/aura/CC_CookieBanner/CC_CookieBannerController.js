({
/**
    Copyright: Salesforce 2017
    Original Author: dharfleet
    Date: 2017-05-18

    A cookie banner component
*/

	doInit : function(component, event, helper) {
		
		console.debug('doInit');
		
		helper.getUserTypeFromPlatform(component, event, helper);
	},

	moreInfo : function(component, event, helper){
		
		console.debug('moreInfo');

    	var articleId = component.get("v.moreInformationRecordId");
    	console.debug('articleId', articleId);

    	helper.navigateToKnowledgeArticle(articleId);
	}, 

	close : function(component, event, helper){
		
		console.log('close');
		
		helper.closeBanner(component);
	}
})