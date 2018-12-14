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

init2();
animate2();

function init2() {
	scene = new THREE.Scene();
	// if (night) {
	// 	scene.background = new THREE.Color( 0x070927 ); //0x87cefa
	// } else {
  var night = new THREE.Color( 0x070927 );
	var day = new THREE.Color( 0x87cefa );
		scene.background = day;
	// }

	// scene.fog = new THREE.Fog( 0xffffff, 0, 750 );


	camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 1, 5000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );


	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 500;


	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 4.0;
	controls.enabled = true;
	controls.minDistance=500;
	controls.maxDistance=1000;
	controls.target= new THREE.Vector3(200,50.461,100.517);


	var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
	keyLight.position.set(-100, 0, 100);

	var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
	fillLight.position.set(100, 0, 100);

	var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
	backLight.position.set(100, 0, -100).normalize();

	var light = new THREE.PointLight( 0xFFFFFF, 1, 190 );
	light.position.set( 100, 50, 0 );

	var light2 = new THREE.PointLight( 0xFFFFFF, 1, 190 );
	light2.position.set( -180, 100, -50 );

		scene.add(keyLight);
		scene.add(fillLight);
		scene.add(backLight);

	// floor

	var planeTexture = new THREE.TextureLoader().load( "assets/wood.jpg" );

	var planeGeometry = new THREE.PlaneBufferGeometry( 1000, 1000, 1000, 1000 );
	planeGeometry.rotateX( - Math.PI / 2 );

	var planeMaterial = new THREE.MeshBasicMaterial( { map: planeTexture } );

	var plane = new THREE.Mesh( planeGeometry, planeMaterial );

	scene.add( plane );

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setTexturePath('assets/');
	mtlLoader.setPath('assets/');

	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );
	
		mtlLoader.load('fix.mtl', function (materials) {

				materials.preload();

				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath('assets/');
				objLoader.load('fix.obj', function (object2) {
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


	// howTo.innerHTML = " MOUSE = Look around";

	var instructions = document.getElementById( 'instructions' );

		instructions.addEventListener( 'click', function () {
			instructions.style.display = 'none';
			blocker.style.display = 'none';
			// controls.lock();
		}, false );

		document.onkeydown = function(evt) {
	    evt = evt || window.event;
	    var isEscape = false;
	    if ("key" in evt) {
	        isEscape = (evt.key == "Escape" || evt.key == "Esc");
	    } else {
	        isEscape = (evt.keyCode == 27);
	    }
	    if (isEscape) {
				blocker.style.display = 'block';
				instructions.style.display = '';
	    }
	};
  var onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

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
      else {scene.background=day;
            scene.remove(light);
             scene.remove(pointLightHelper);
                        scene.remove(pointLightHelper2);
                        scene.remove(keyLight);
		                  scene.remove(fillLight);
		                  scene.remove(backLight);
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
  document.addEventListener( 'keydown', onKeyDown, false );
}

function animate2() {

	animationId = requestAnimationFrame( animate2 );
	controls.update();
	renderer.render( scene, camera );

};
