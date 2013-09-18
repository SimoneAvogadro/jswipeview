/**
 * jQuery wrapper for the swipeview page slider 
 * 
 * Sample uses:

-----------------
Esempio 1:
 - elenco di slide definito come un elenco di URL
 - div in cui posizionare lo swiper
 - div che fa da navigatore => link avanti/indietro autogenerati
 	nota: questo DIV ha lo stesso ID dello swipe + '-nav': convenzione di nomi!
 
<link   href="swipeview.css" rel="stylesheet" type="text/css">
<script src ="swipeview.js"   type="text/javascript" ></script>
<script src ="jswipeview.js"  type="text/javascript" ></script>

<ul id="swipeview-nav"></ul><!-- questo DIV verrà popolato con i link di navigazione -->
<div id="swipeview"></div>  <!-- questo DIV conterrà lo swipeview -->

<script type="text/javascript">
	var slides = [
  			'/open/news/Honda-e-Bicocca-sperimentano-il-nuovo-stile-di-guida-virtuoso-2/1677231702734660881?inner=inner',
  			'/open/news/Times-Higher-Education-Ranking_-Bicocca-prima-in-classifica-fra-le-italiane/8296412245996974175?inner=inner',
  			'/open/news/Test-di-ingresso-20112012_-aggiornamenti-su-graduatorie-e-avvisi/8340234653019567613?inner=inner',
  			'/open/news/Universita-e-disabilita-gli-atenei-della-Lombardia-fanno-rete/8405852357286088809?inner=inner'
  	];

	$('#swipeview').swipeview({
		'slides': slides  
	});
</script>

-----------------
Esempio 2:
 - elenco di slide definito come un elenco di oggetti con URL + titolo
 - div in cui posizionare lo swiper
 - nessun div che fa da navigatore => link avanti/indietro creati a mano
 	nota: questi DIV hanno lo stesso ID dello swipe + '-nav-next' e '-nav-prev': convenzione di nomi!

<link   href="swipeview.css" rel="stylesheet" type="text/css">
<script src ="swipeview.js"   type="text/javascript" ></script>
<script src ="jswipeview.js"  type="text/javascript" ></script>

<div class="swipeview-nav-next">avanti!</div><!--  	questo DIV manderà avanti la navigazione, evento automatico per convenzione di nome -->
<div class="swipeview-nav-prev">indietro!</div><!-- questo DIV manderà indietro la navigazione, evento automatico per convenzione di nome -->

<div id="swipeview"></div>  <!-- questo DIV conterrà lo swipeview -->

<script type="text/javascript">
	var slides = [
	  			{
					address : '/open/news/Honda-e-Bicocca-sperimentano-il-nuovo-stile-di-guida-virtuoso-2/1677231702734660881?inner=inner',
					title : 'Honda e Bicocca sperimentano il nuovo stile di guida virtuoso 2'
				},{
					address : '/open/news/Times-Higher-Education-Ranking_-Bicocca-prima-in-classifica-fra-le-italiane/8296412245996974175?inner=inner',
					title : 'Times Higher Education Ranking: Bicocca prima in classifica fra le italiane'
				},{
					address : '/open/news/Test-di-ingresso-20112012_-aggiornamenti-su-graduatorie-e-avvisi/8340234653019567613?inner=inner',
					title : 'Test di ingresso 2011/2012: aggiornamenti su graduatorie e avvisi'
				},{
					address : '/open/news/Universita-e-disabilita-gli-atenei-della-Lombardia-fanno-rete/8405852357286088809?inner=inner',
					title : 'Università e disabilità, gli atenei della Lombardia fanno rete '
				}
	];

	$('#swipeview').swipeview({
		'slides': slides  
	});
</script>


-----------------
Esempio 3:
 - elenco di slide definito come un elenco di oggetti con URL + titolo
 - div in cui posizionare lo swiper
 - custom div che fanno da navigatori => associamo a mano gli eventi
 - azioni custom in risposta agli eventi standard
 - personalizza i colori del titolo

<link   href="swipeview.css" rel="stylesheet" type="text/css">
<script src ="swipeview.js"   type="text/javascript" ></script>
<script src ="jswipeview.js"  type="text/javascript" ></script>

<!-- personalizza i colori del titolo -->
<style>
#swipeview-slider .swipeview-title {
	background-color: #037188;
	color: white;
}
</style>


<div id="vieni-avanti">  === avanti === </div><!-- questo DIV verrà associato programmativamente (vedi sotto) come evento pagina avanti -->
<div id="torna-indietro">== indietro == </div><!-- questo DIV verrà associato programmativamente (vedi sotto) come evento pagina avanti -->

<div id="galleria"></div>  <!-- questo DIV conterrà lo swipeview -->

<script type="text/javascript">
	// elenco delle slide da mostrare
	var slides = [
	  			{
					address : '/open/news/Honda-e-Bicocca-sperimentano-il-nuovo-stile-di-guida-virtuoso-2/1677231702734660881?inner=inner',
					title : 'Honda e Bicocca sperimentano il nuovo stile di guida virtuoso 2'
				},{
					address : '/open/news/Times-Higher-Education-Ranking_-Bicocca-prima-in-classifica-fra-le-italiane/8296412245996974175?inner=inner',
					title : 'Times Higher Education Ranking: Bicocca prima in classifica fra le italiane'
				},{
					address : '/open/news/Test-di-ingresso-20112012_-aggiornamenti-su-graduatorie-e-avvisi/8340234653019567613?inner=inner',
					title : 'Test di ingresso 2011/2012: aggiornamenti su graduatorie e avvisi'
				},{
					address : '/open/news/Universita-e-disabilita-gli-atenei-della-Lombardia-fanno-rete/8405852357286088809?inner=inner',
					title : 'Università e disabilità, gli atenei della Lombardia fanno rete '
				}
	];

	// crea la swipeview sulla galleria
	var $swipe = $('#galleria').swipeview({
		'slides': slides  
	});
	
	// riceve la notifica quando una pagina viene sfogliata
	$('#galleria').bind('swipeview-load', function( event, address, titolo, indice ) {
		console.log('load! on: ' + event.target + ' to address:' + address);
	});
	$('#galleria').bind('swipeview-show', function( event, address, titolo, indice ) {
		console.log('show! '+this+' for title:'+ titolo+' for address:' + address);
		window.history.pushState({'swipeIndex': indice}, titolo, address);
		document.title = titolo;
	});
	
	// associa miei eventi per mandare avanti/indietro
	$('#vieni-avanti').click(function( event ) {
		$swipe.next();
	});
	$('#torna-indietro').click(function( event ) {
		$swipe.prev();
	});

	// Spegne il comportamento di default del browser in presenza di swipe orizzontale sul documento
	if (typeof document.addEventListener != 'undefined') {
		document.addEventListener('touchmove', function (e) { 
			e.preventDefault();
		}, false);
	}
</script>




 */
(function($){
	
			function jSwipeView(element, options) {
				var base      = this;
				var slides    = options.slides;
				// 1: create the wipeview object itself
				this.$element = $(element);
				this.$element.width( this.$element.width() );  // fix the width in px instead of %
				var  $element = this.$element;

				var gallery   = new SwipeView(element, { numberOfPages: slides.length });
				this.gallery  = gallery;
				this.slides   = slides;
				this.objectID = this.$element.attr('id');
				this._name    = 'swipeview';
				this._isOldIE = this.isOldIE();
				this.$navigator = $('#'+this.objectID+'-nav');

				// 2: create (if required) a navigator
				if (this.$navigator) {
					this.$navigator.width( 25*(2+slides.length) );

					this.$navigator.append('<li class="'+this.objectID+'-nav-prev" >-</li>');
					this.$navigator.append('<li class="swipeview-nav-jump selected"></li>');
					for (i=1; i<slides.length; i++) {
						this.$navigator.append('<li class="swipeview-nav-jump"></li>');
					}
					this.$navigator.append('<li class="'+this.objectID+'-nav-next" >+</li>');
				};
				$('.'+this.objectID+'-nav-prev').click( function() {
					base.prev();
				} ).css('cursor','pointer');
				$('.'+this.objectID+'-nav-next').click( function() {
					base.next();
				} ).css('cursor','pointer');
				$('li.swipeview-nav-jump').click( function(corr) {
					var dest = $(this).parent().find('li.swipeview-nav-jump').index( this );
					base.goToPage(dest);
				} );

				// load first on the contents for the master page 
				this.__loadPageContent(gallery.masterPages[1], gallery.masterPages[1].dataset.upcomingPageIndex	);
				if (!this._isOldIE) {
					this.__loadPageContent(gallery.masterPages[0], gallery.masterPages[0].dataset.upcomingPageIndex	);							
					this.__loadPageContent(gallery.masterPages[2], gallery.masterPages[2].dataset.upcomingPageIndex	);							
				}

				this.gallery.onFlip(function () {
					var i;

					for (i=0; i<3; i++) {
						base.__loadPage(i);
					}

					if (base.$navigator) {
						base.$navigator.find('li.selected').attr('class','swipeview-nav-jump');
						base.$navigator.find('li.swipeview-nav-jump:eq('+(base.gallery.pageIndex)+')').attr('class','swipeview-nav-jump selected');
					}
				});
				
				this.gallery.onAfterFlip(function () {
					base.__resize();

					try {
						$(gallery.masterPages[gallery.currentMasterPage]).find('.swipeview-title').css('position','static');
						if (! gallery.masterPages[gallery.currentMasterPage].swipeIsLoading) {
							$(gallery.masterPages[gallery.currentMasterPage])
								.find('.swipeview-content')
								.children(":first")
								.trigger(
									'swipeview-show', 
									[	gallery.masterPages[gallery.currentMasterPage].swipeAddress, 
										gallery.masterPages[gallery.currentMasterPage].swipeTitle,
										gallery.masterPages[gallery.currentMasterPage].swipeIndex		]
							);
							if (gallery.masterPages[gallery.currentMasterPage].swipeTitle != '')
								window.document.title = gallery.masterPages[gallery.currentMasterPage].swipeTitle;
						}
					} catch (e) {
						if (window.console)
							console.log(e);
					}
				});
			};

			/**
			 * Resize the object's view to match the size of the content
			 */
			jSwipeView.prototype.__resize= function (pageIndex) {
				var altezza = 0;
				this.$element.find('.swipeview-active').children().each( function() {
					altezza += $(this).outerHeight();
				});
				this.$element.height( altezza );
			};

			/**
			 * loads (if needed) the contents of the index-page (0<=index<=2)
			 */
			jSwipeView.prototype.__loadPage= function (pageIndex) {
				if (this.gallery.masterPages[pageIndex].dataset.upcomingPageIndex != this.gallery.masterPages[pageIndex].dataset.pageIndex) {
					this.__loadPageContent(
							this.gallery.masterPages[pageIndex], 
							this.gallery.masterPages[pageIndex].dataset.upcomingPageIndex 
					);
				}
			};

			/**
			 * Loads into the target the n-th slide
			 */
			jSwipeView.prototype.__loadPageContent = function(target, index) {
				// don't refresh when preloading out-of-index pages
				if ( index<0 || index>=this.slides[index].length )
					return;
				
				var base = this;
			    var $dest = $(target);
				$dest.children().remove();

				// console.log("tipo" + (typeof this.slides[index]) );

				var $title ='';
				var targetTitle = '';
				var targetAddress;
				var targetIndex = index;
				
				// array of complex objects vs. array of strings
				if (typeof this.slides[index]=='string') {
					targetAddress = this.slides[index];
				} else {
					targetAddress = this.slides[index].address;

					if (typeof this.slides[index].title != 'undefined') {
						targetTitle   = this.slides[index].title;
						$title = $('<span class="swipeview-title">'+targetTitle+'</span>').click( function() {
							this.gallery.next();
						});
					}
				}			

				target.swipeIsLoading = true;
				var $content = 
					$('<div class="swipeview-content" ><div class="swipeview-loading"><img src="/res/wp/images/cm/loading.gif"></div></div>')
					.load( targetAddress
						, function(response, status, xhr) {
							if (status == "error") {
								$content().html("Problems loading the page: "+targetAddress);
								$dest.show();
								return;
							};
							$dest.show();
							base.__resize();
							try {
								target.swipeAddress   = targetAddress;
								target.swipeTitle     = targetTitle;
								target.swipeIndex     = targetIndex;
								target.swipeIsLoading = false;
								$dest.find('.swipeview-title').css('position','absolute');
								$content.children(":first").trigger('swipeview-load', [targetAddress, targetTitle, targetIndex] );
								// check if we are updating the page being shown and if so also trigger the show event
								if ($dest.hasClass('swipeview-active') ) {
									$dest.find('.swipeview-title').css('position','static');
									$content.children(":first").trigger('swipeview-show',	[targetAddress, targetTitle, targetIndex] );
									if (targetTitle != '')
										window.document.title = targetTitle;
								}
							} catch (e) {
								if (window.console)
									console.log(e);
							}
						}
					);

				// $dest.hide();
				$dest.append($title, $content);
				$dest.show();
			};
			
			/**
			 * Check if we are running in an old browser and must fallback to no-transition pagination
			 */
			jSwipeView.prototype.isOldIE = function() {
				if (typeof document.addEventListener === 'undefined')
					return true;
				else
					return false;
			}

			/**
			 * Load the new page using a method which can work on old IE installations
			 */
			jSwipeView.prototype.oldIELoadPage = function() {
				if (this.gallery.pageIndex <0 )
					this.gallery.pageIndex =0;
				else if (this.gallery.pageIndex > this.gallery.options.numberOfPages-1)
					this.gallery.pageIndex = this.gallery.options.numberOfPages-1;

				this.__loadPageContent( this.gallery.masterPages[1] , this.gallery.pageIndex );
				if (this.$navigator) {
					this.$navigator.find('li.selected').attr('class','swipeview-nav-jump');
					this.$navigator.find('li.swipeview-nav-jump:eq('+(this.gallery.pageIndex)+')').attr('class','swipeview-nav-jump selected');
				}
			}

			/**
			 * Move to next page
			 */
			jSwipeView.prototype.next = function () {
				if ( !this.isOldIE() ) {
					this.gallery.next();
				} else {
					this.gallery.pageIndex++;
					this.oldIELoadPage();
				}
			};

			/**
			 * Move to prev page
			 */
			jSwipeView.prototype.prev = function () {
				if ( !this.isOldIE() ) {
					this.gallery.prev();
				} else {
					this.gallery.pageIndex--;
					this.oldIELoadPage();
				}
			};
			
			/**
			 * Move to prev page
			 */
			jSwipeView.prototype.goToPage = function (indice) {
				if ( !this.isOldIE() ) {
					this.gallery.goToPage(indice);
				} else {
					this.gallery.pageIndex = indice;
					this.oldIELoadPage();
				}
			}

			jSwipeView.prototype.get = function() {
				return this.element;
			}

			$.fn['swipeview'] = function( options ) {
				var res;
				this.each( function() {
					res = new jSwipeView(this, options);
				});
				return res;
			}

})(jQuery);

