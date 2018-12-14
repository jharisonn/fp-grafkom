var camera, scene, renderer, controls;

var objects = [];

var raycaster;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();
var light;

let animationId = null;
let mode;

let night;

let clicked = 0;
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
			if ( havePointerLock ) {
				var element = document.body;
				var pointerlockchange = function ( event ) {
					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
						controls.enabled = true;
						blocker.style.display = 'none';
					} else {
						controls.enabled = false;
						blocker.style.display = '-webkit-box';
						blocker.style.display = '-moz-box';
						blocker.style.display = 'box';

					}
				}
				var pointerlockerror = function ( event ) {

				}
				// Hook pointer lock state change events
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					if ( /Firefox/i.test( navigator.userAgent ) ) {
						var fullscreenchange = function ( event ) {
							if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
								document.removeEventListener( 'fullscreenchange', fullscreenchange );
								document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
								element.requestPointerLock();
							}
						}
						document.addEventListener( 'fullscreenchange', fullscreenchange, false );
						document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
						element.requestFullscreen();
					}
						element.requestPointerLock();
					}



function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

	// TODO: get right angle of camera, set initial position to front of Gor
	// camera.position.set(-10,0,0);
	var night = new THREE.Color( 0x070927 );
	var day = new THREE.Color( 0x87cefa );


	scene = new THREE.Scene();
	scene.background = day;

	// scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

	controls = new THREE.PointerLockControls( camera );

	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );

		instructions.addEventListener( 'click', function () {

			controls.lock();
		}, false );

	controls.addEventListener('lock',function(){
		blocker.style.display = 'none';
	});
	controls.addEventListener('unlock',function(){
		blocker.style.display='block';
	});



			scene.add( controls.getObject() );

			var onKeyDown = function ( event ) {

				switch ( event.keyCode ) {

					case 38: // up
					case 87: // w
						moveForward = true;
						break;

					case 37: // left
					case 65: // a
						moveLeft = true;
						break;

					case 40: // down
					case 83: // s
						moveBackward = true;
						break;

					case 39: // right
					case 68: // d
						moveRight = true;
						break;

					case 32: // space
						if ( canJump === true ) velocity.y += 100;
						canJump = false;
						break;
					case 49:
						controls.getObject().position.x=456.6011714415259;
						controls.getObject().position.y=50;
						controls.getObject().position.z=54.60993014976398;
						break;
					case 50:
					// 456.14681795364293X, 50 Y, 127.159690102761Z
					controls.getObject().position.x=456.1468179536429;
					controls.getObject().position.y=50;
					controls.getObject().position.z=127.159690102761;
					break;
					case 51:
					// 485.7840625605946X, 50 Y, 334.23845714331776Z
					controls.getObject().position.x=485.7840625605946;
					controls.getObject().position.y=30;
					controls.getObject().position.z=334.23845714331776;
					break;
					case 52:
					// 187.9946585101288X, 50 Y, 338.7983098154048Z
					controls.getObject().position.x=187.9946585101288;
					controls.getObject().position.y=50;
					controls.getObject().position.z=338.7983098154048;
					break;
					case 53:
					// 226.86801495395525X, 50 Y, 54.37099072330575Z
					controls.getObject().position.x= 226.86801495395525;
					controls.getObject().position.y=50;
					controls.getObject().position.z=54.37099072330575;
					break;
					case 74:
					case 106:
					if(scene.background==day){
						scene.background=night;
                        scene.remove(light);
                        light = new THREE.HemisphereLight( 0xA9A9A9, 0x080820, 1 );
	                    scene.add( light );
//                        scene.add( light );
//		scene.add( light2 );
                        scene.remove(pointLightHelper);
                        scene.remove(pointLightHelper2);
                        scene.remove(keyLight);
		                  scene.remove(fillLight);
		                  scene.remove(backLight);
		                  
					}
					else {
                        scene.background=day;
                        scene.remove(light);
                        light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	                    scene.add( light );
                        
                        var sphereSize = 1; var sphereSize2 = 5;
		                  var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
		                  scene.add( pointLightHelper );

		                  var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize2 );
		                  scene.add( pointLightHelper2 );
                        scene.add(keyLight);
		                  scene.add(fillLight);
		                  scene.add(backLight);
                    }
					break;
				}

			};

			var onKeyUp = function ( event ) {

				switch ( event.keyCode ) {

					case 38: // up
					case 87: // w
						moveForward = false;
						break;

					case 37: // left
					case 65: // a
						moveLeft = false;
						break;

					case 40: // down
					case 83: // s
						moveBackward = false;
						break;

					case 39: // right
					case 68: // d
						moveRight = false;
						break;

				}

			};

			document.addEventListener( 'keydown', onKeyDown, false );
			document.addEventListener( 'keyup', onKeyUp, false );


// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();

camera.add( listener ); // create the PositionalAudio object (passing in the listener)



// create an object for the sound to play from
	var sphere = new THREE.SphereGeometry( 5, 5, 5 );
	var material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
	var mesh = new THREE.Mesh( sphere, material );
	mesh.position.set(0, -10, -100); //hide the sphere
	scene.add( mesh ); // finally add the sound to the mesh mesh.add( sound );



	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	// floor
	var planeTexture = new THREE.TextureLoader().load( "assets/wood.jpg" );

	var planeGeometry = new THREE.PlaneBufferGeometry( 1000, 1000, 1000, 1000 );
	planeGeometry.rotateX( - Math.PI / 2 );

	var planeMaterial = new THREE.MeshBasicMaterial( { map: planeTexture } );

	var plane = new THREE.Mesh( planeGeometry, planeMaterial );

	scene.add( plane );

	// lighting

	var keyLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.5); //1.0
	keyLight.position.set(-100, 0, 100);

	var fillLight = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 0.75); //0.75
	fillLight.position.set(100, 0, 100);

	var backLight = new THREE.DirectionalLight(0xffffff, 0.5); //1.0
	backLight.position.set(100, 0, -100).normalize();


	var light = new THREE.PointLight( 0xFFFFFF, 1, 250 );
	light.position.set( 100, 80, 0 );

	var light2 = new THREE.PointLight( 0xFFFFFF, 1, 200 );
	light2.position.set( -180, 100, -50 );

//	if (night) {
//		scene.add( light );
//		scene.add( light2 );
//
//		var sphereSize = 1; var sphereSize2 = 5;
//		var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
//		scene.add( pointLightHelper );
//
//		var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize2 );
//		scene.add( pointLightHelper2 );
//	} else {
		scene.add(keyLight);
		scene.add(fillLight);
		scene.add(backLight);
//	}


	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setTexturePath('assets/');
	mtlLoader.setPath('assets/');

	light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );

	mtlLoader.load('selesai.mtl', function (materials) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('assets/');
			objLoader.load('selesai.obj', function (object2) {
				scene.add(object2);
					object2.rotation.y = 0;

					object2.position.y += 0;
					object2.position.x += 0;
					object2.position.z -= 100;
			});

	}, // called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	});

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


	document.body.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	animationId = requestAnimationFrame( animate );

		if ( controls.isLocked === true ) {

			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;

			var intersections = raycaster.intersectObjects( objects );

			var onObject = intersections.length > 0;

			var time = performance.now();
			var delta = ( time - prevTime ) / 1000;

			velocity.x -= velocity.x * 20.0 * delta;
			velocity.z -= velocity.z * 20.0 * delta;

			velocity.y -= 9.8 * 25.0 * delta; // 100.0 = mass

			direction.z = Number( moveForward ) - Number( moveBackward );
			direction.x = Number( moveLeft ) - Number( moveRight );
			direction.normalize(); // this ensures consistent movements in all directions

			if ( moveForward || moveBackward ) {
				velocity.z -= direction.z * 1500.0 * delta;
				console.log(controls.getObject().position.x + "X, " + controls.getObject().position.y + " Y, " + controls.getObject().position.z + "Z");
			}
			if ( moveLeft || moveRight ) {velocity.x -= direction.x * 1500.0 * delta;
			console.log(controls.getObject().position.x + "X, " + controls.getObject().position.y + " Y, " + controls.getObject().position.z + "Z");}

			if ( onObject === true ) {

				velocity.y = Math.max( 0, velocity.y );
				canJump = true;

			}

			controls.getObject().translateX( velocity.x * delta );
			controls.getObject().translateY( velocity.y * delta );
			controls.getObject().translateZ( velocity.z * delta );

			if ( controls.getObject().position.y < 50 ) {

				velocity.y = 0;
				controls.getObject().position.y = 50;

				canJump = true;

			}

			prevTime = time;

		}



	renderer.render( scene, camera );

}
init();
animate();
