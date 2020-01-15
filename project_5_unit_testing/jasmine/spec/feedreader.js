/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 * All tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object
         * and ensure it has a URL defined and that the URL is not empty.
         */
        it('have a defined and non-empty url', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */

         it('have a valid and non-empty name',function(){
             allFeeds.forEach(function(feed){
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).toBeGreaterThan(0);
             });
         });
    });

    // New test suite 
    describe('The Menu', function(){
        // Ensure the menu element is hidden by default. 
         it('the menu is hidden by default', function(){
             console.log($('body'));
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });

        // Ensures the menu changes visibility when the menu icon is clicked.
        it('menu changing visibility', function() {
            $(".menu-icon-link").trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $(".menu-icon-link").trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //New test suite
    describe('Intial Entries', function(){
        /* ensure when the loadFeed function is called and completes its work,
         *  there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('at least a single .entry element within the .feed container', function() {
            expect($('.entry').length).toBeGreaterThan(0);
            expect($('.feed').length).toBeGreaterThan(0);

        });
    });

    //New test suite     
    describe('New Feed Selection', function() {
        var preFeed;
        var postFeed;

        // Ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        beforeEach(function(done) {
            loadFeed(0, function() { 
                console.log($('.feed').html());
                 preFeed = $('.feed').html(); 
                done();
            });
        });

        it('when new feed is loaded by loadFeed function, content changes', function(done) {
            loadFeed(1, function() {
                postFeed = $('.feed').html();
                expect(postFeed).not.toEqual(preFeed);
                done();
            });
        });

    });
}());
