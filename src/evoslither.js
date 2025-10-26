/* metadata header
 What it does: Information for Tampermonkey - tells it where and when to run the script.*/

// ==UserScript==
// @name Slither.io auto play bot 2025
// @include     http://slither.com/io
// @author      Saarlooswolf
// @description auto play bot for slither.io 
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @match        *://Slither.com/io/*
// @license MIT License
// ==/UserScript==

/*Copyright 2025 Saarlooswolf

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

/* Bot status variables */
var view_xx = view_xx || 0;
var view_yy = view_yy || 0;
var fvx = fvx || 0;
var fvy = fvy || 0;
var xm = xm || 0;
var ym = ym || 0;

/* anti-key-bounce variables */
var lastCKeyTime = 0;

/* evolution tracking variables */
var borderDeaths = 0;
var enemyDeaths = 0;
var unknowDeaths = 0;
var lastDeathType = null;  // 'border', 'enemy', o 'unknown'

/* INTERFACE CLEANER
	What it does: Removes distracting elements:
		Advertising iframes
		Voting buttons and political elements
		Cleans up the interface for better gameplay
*/
var el = document.getElementsByTagName('iframe');

for (var i = 0; i < el.length; i++) {
    var currentEl = el[i];
    currentEl.remove();
}

// remove the vote text
if (document.getElementById("votetxth") !== null) {
    document.getElementById("votetxth").remove();
}
if (document.getElementById("trumpbtnh") !== null) {
    document.getElementById("trumpbtnh").remove();
}
if (document.getElementById("kamalabtnh") !== null) {
    document.getElementById("kamalabtnh").remove();
}

if (window.top != window.self);

/* LEARNING SYSTEM
MAIN VARIABLES:
*/
REALSCORE = 10;
REALDNA = [1,1,1,1,1,1,1,1,1,1,1,1];

BESTRANK = 1000;
BESTSCORE = 1;

printbot = function() {
    console.log("Dumping bot data:\nREALDNA = " + JSON.stringify(REALDNA) + ";\nREALSCORE = " + REALSCORE + ";\nBESTRANK = " + BESTRANK + ";\nBESTSCORE = " + BESTSCORE + ";");
}

/* SAVING PROGRESS:
What it does: Saves progress in the browser so the bot learns over time.
*/
savedna = function() {
    if(typeof(Storage) !== "undefined") {
        localStorage["REALSCORE"] = REALSCORE;
        localStorage["REALDNA"] = JSON.stringify(REALDNA);
        localStorage["BESTRANK"] = BESTRANK;
        localStorage["BESTSCORE"] = BESTSCORE;
    }        
}

cleardna = function() {
    localStorage.removeItem("REALSCORE");
    localStorage.removeItem("REALDNA");
    localStorage.removeItem("BESTRANK");
    localStorage.removeItem("BESTSCORE");
    
    REALSCORE = 30;
    BESTRANK = 1000;
    
    var distavoid = 90;
    var preykerroin = 5;
    var viholliskerroin = 544;
    var vaarakerroin = 200;
    var chargedistance = 500;
    var pakoondistance = 70;
    var keskikerroin = 2.0;
    var keskihakukerroin = 0.1;

	/* WHAT THE DNA PARAMETERS CONTROL:
		distavoid,			// Safe distance from enemies
		preykerroin,		// Hunting aggression
		viholliskerroin,	// Fear of opponents
		vaarakerroin, 		// Beware of dangers
		chargeddistance,	// When to attack
		pakoondistance,		// When to flee
		keskikerroin,		// Tendency to stay in the center
		keskihakukerroin	// Another center parameter
	*/
    REALDNA = [distavoid,preykerroin,viholliskerroin,vaarakerroin,chargedistance,pakoondistance,keskikerroin,keskihakukerroin];
        
    TESTDNA = REALDNA.slice();
    TESTSCORE = REALSCORE;
    
    testingdna = 1;
    DNA = REALDNA.slice();
    
    savedna();
}

if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (!localStorage.REALSCORE || !localStorage.REALDNA || !localStorage.BESTRANK || !localStorage.BESTSCORE) {
        cleardna();
    }
    else
    {
        REALSCORE = localStorage["REALSCORE"]*1;
        REALDNA = JSON.parse(localStorage["REALDNA"]);
        BESTRANK = localStorage["BESTRANK"]*1;
        BESTSCORE = localStorage["BESTSCORE"]*1;
    }
} else {
    // Sorry! No Web Storage support..
}


TESTDNA = REALDNA.slice();
TESTSCORE = REALSCORE;

testingdna = 1;
DNA = REALDNA.slice();

var injected_dead = true;

var lastscore = 0;
var bestscore = 0;

var lastrank = 0;
var bestrank = 1000;
var uhka = false;


var ruokakerroin = 1/40;
var ruokapower = 1;
var vihollispower = 2;
var vaarapower = 2;
var preypower = 1;
var keskipower = 1;


var preychase = true;

var learnrate = 0.3;
var precision = 100;
var EnableBot = true;

/* STATUS PANEL FUNCTIONS */
function updateStatusPanel() {
    let panel = document.getElementById('botStatusPanel');
    if (panel && panel.style.display !== 'none') {
        // Determine last cause of death
        let lastDeathCause = "No death 'till last restart";
        let lastDeathColor = "#aaa";
        
        if (lastDeathType === 'border') {
            lastDeathCause = "💀 LAST: BORDER (map exit)";
            lastDeathColor = "#f00";
        } else if (lastDeathType === 'enemy') {
            lastDeathCause = "💀 LAST: ENEMY (defeat)";
            lastDeathColor = "#f50";
        } else if (lastDeathType === 'unknown') {
            lastDeathCause = "💀 LAST: UNKNOWN REASON";
            lastDeathColor = "#ff0";
        }

        panel.innerHTML = `
            <div style="margin-bottom:5px; font-weight:bold;">🤖 EvoSlither (Slither.io bot)</div>
            <div>BOT: <span style="color:${EnableBot ? '#0f0' : '#f00'}">${EnableBot ? '✅ ON' : '❌ OFF'}</span></div>
            ${EnableBot ? `<div>DNA: [${DNA?.map(d => d.toFixed(1)).join(', ')}]</div>` : ''}
            ${EnableBot ? `<div>Testing: ${testingdna}</div>` : ''}
            <div>Score: ${lastscore || 0} | Rank: ${lastrank || 0}</div>
            <div>Best: ${BESTSCORE || 0} | Best Rank: ${BESTRANK || 0}</div>
            ${slither && !injected_dead ? `
                <div>Pos: ${slither.xx.toFixed(0)}, ${slither.yy.toFixed(0)}</div>
                <div>Enemies: ${slithers?.length || 0} | Food: ${foods_c || 0}</div>
            ` : '<div style="color:#f00;">💀 DEAD SNAKE</div>'}
            
            <!-- EVOLUTION STUDY SECTION -->
            <div style="margin-top:8px; border-top:1px solid #444; padding-top:8px;">
                <div style="color:#ff0; font-weight:bold; margin-bottom:4px;">🔬 EVOLUTION STUDY (DNA FULL MAP):</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; font-size: 11px;">
                    <div>0. Safety: <span style="color:#0ff">${DNA[0]?.toFixed(0) || 0}</span></div>
                    <div>1. Aggression: <span style="color:#f0f">${DNA[1]?.toFixed(1) || 0}</span></div>
                    <div>2. Enemies fear: <span style="color:#f80">${DNA[2]?.toFixed(0) || 0}</span></div>
                    <div>3. Dangers attention: <span style="color:#fa0">${DNA[3]?.toFixed(0) || 0}</span></div>
                    <div>4. Attack distance: <span style="color:#0f0">${DNA[4]?.toFixed(0) || 0}</span></div>
                    <div>5. Escape distance: <span style="color:#f00">${DNA[5]?.toFixed(0) || 0}</span></div>
                    <div>6. Center bias: <span style="color:#8af">${DNA[6]?.toFixed(2) || 0}</span></div>
                    <div>7. Secondary center: <span style="color:#a8f">${DNA[7]?.toFixed(2) || 0}</span></div>
                </div>
                <div style="margin-top:4px;">
                    <div>Border deaths: <span style="color:#f00">${borderDeaths || 0}</span></div>
                    <div>Enemies deaths: <span style="color:#f50">${enemyDeaths || 0}</span></div>
                    <div>Unknow reason deaths: <span style="color:#f50">${unknowDeaths || 0}</span></div>
                </div>
                <div style="margin-top:6px; font-size:11px; color:${lastDeathColor}; font-weight:bold;">
                    ${lastDeathCause}
                </div>
            </div>
            
            <div style="margin-top:5px; font-size:10px; color:#aaa;">Auto-update active</div>
        `;
    }
}

function startPanelAutoRefresh() {
    // Stop any previous interval
    stopPanelAutoRefresh();
    // Start new interval (1000ms = 1 second)
    window.panelRefreshInterval = setInterval(updateStatusPanel, 1000);
}

function stopPanelAutoRefresh() {
    if (window.panelRefreshInterval) {
        clearInterval(window.panelRefreshInterval);
        window.panelRefreshInterval = null;
    }
}

/* GLOBAL EVENT LISTENER */
document.addEventListener('keydown', (event) => {
    if (event.key === 'e') {
        console.log("Enabling bot");
        EnableBot = !EnableBot;
    }

    if (event.key === 'c' && !event.repeat) {
        var now = Date.now();
        if (now - lastCKeyTime < 500) return;
        lastCKeyTime = now;
        
        console.log("=== BOT STATUS ===");
        console.log("Bot active: " + EnableBot);
        console.log("DNA: " + JSON.stringify(DNA));
        console.log("Testing DNA: " + testingdna);
        console.log("Score: " + lastscore + " | Rank: " + lastrank);
        console.log("Best Score: " + BESTSCORE + " | Best Rank: " + BESTRANK);
        
        if (slither && !injected_dead) {
            console.log("Position: " + slither.xx.toFixed(0) + ", " + slither.yy.toFixed(0));
            console.log("Nearby enemies: " + slithers.length);
            console.log("Available food: " + foods_c);
        } else {
            console.log("Snake dead or uninitialized");
        }
        console.log("==================");
    }
    
    if (event.key === 'v' && !event.repeat) {
        var now = Date.now();
        if (now - lastCKeyTime < 500) return;
        lastCKeyTime = now;
        
        let panel = document.getElementById('botStatusPanel');
        if (!panel) {
            // Panel creation
            panel = document.createElement('div');
            panel.id = 'botStatusPanel';
            panel.style.cssText = 'position:fixed; top:10px; left:10px; color:lime; padding:10px; z-index:9999; font-family:monospace; background:rgba(0,0,0,0.1); border:1px solid lime; border-radius:5px; font-size:12px;';
            document.body.appendChild(panel);
            
            // First immediate update
            updateStatusPanel();
            
            // Start auto-update
            startPanelAutoRefresh();
            
            console.log("🖥️ Pannello attivato con auto-aggiornamento");
        } else {
            // Visibility toggle
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                startPanelAutoRefresh();
                console.log("🖥️ Pannello riattivato");
            } else {
                panel.style.display = 'none';
                stopPanelAutoRefresh();
                console.log("🖥️ Pannello nascosto");
            }
        }
    }
});

/* BOT MAIN LOGIC */
INJECTED = function() {
    var kerroin = 10000;
    
    if (animating && EnableBot) {
        if (slither) {
            accelerate = false;
            injected_dead = false;
            
            //xm = grd-slither.xx;
            //ym = grd-slither.yy;
            
            xt = 0;
            yt = 0;
            
            mindist = grd;
            
            
            for (var i = 0; i < preys.length; i++) {
                xtd = (preys[i].xx-slither.xx);
                ytd = (preys[i].yy-slither.yy);
                
                dist = Math.sqrt(xtd*xtd + ytd*ytd);
                
                xt += xtd/Math.pow(dist,preypower+1)*DNA[1];
                yt += ytd/Math.pow(dist,preypower+1)*DNA[1];
                
                /* ACCELERATION:
					What it does: Decides when to press the mouse to go faster.
                */
                if (dist < DNA[4] && preychase)
                {
                    accelerate = true;
                }
            }

            /* ENEMIES AVOIDANCE:
				What it does: Calculates enemy repulsion:
				The closer they are, the faster it runs away.
				Consider the enemy snake's entire body.
            */
            uhka = false;
            for (var i = 0; i < slithers.length; i++) {
                //alert(myStringArray[i]);
                
                target = slithers[i];
                
                if (slither.id!=target.id)
                {
                    xtd = (target.xx-slither.xx);
                    ytd = (target.yy-slither.yy);
                    
                    dist = Math.sqrt(xtd*xtd + ytd*ytd)-DNA[0];
                    dist = Math.max(1, dist);
                    
                    xt += -xtd/Math.pow(dist,vihollispower+1)*DNA[2];
                    yt += -ytd/Math.pow(dist,vihollispower+1)*DNA[2];
                    
					/* ACCELERATION:
						What it does: Decides when to press the mouse to go faster.
					*/
                    if (dist < DNA[5])
                    {
                        accelerate = true;
                    }
                    
                    if (dist<mindist)
                    {
                        uhka = target;
                        mindist = dist;
                        /*if (mindist<300)
                        {
                            accelerate = true;
                        }*/
                    }
                    
                    parts = target.pts;
                    for (var k = 0; k < parts.length; k++)
                    {
                        part = parts[k];
                    
                        xtd = (part.xx-slither.xx);
                        ytd = (part.yy-slither.yy);
                        
                        dist = Math.sqrt(xtd*xtd + ytd*ytd)-DNA[0];
                        dist = Math.max(1, dist);
                        
                        xt += -xtd/Math.pow(dist,vaarapower+1)*DNA[3];
                        yt += -ytd/Math.pow(dist,vaarapower+1)*DNA[3];
                    }
        
                }
            }
            
			/* MAIN GAME LOGIC
				MOVEMENT CALCULATION:
					What it does: Calculates the attraction to the food based on:
					Distance (the closer it is, the more attractive it is)
					Size (larger food = more attractive)
			*/
            if (!(preychase && preys.length>0))
            {
                for (var i = 0; i < foods_c; i++) {
                    //alert(myStringArray[i]);
                    
                    xtd = (foods[i].xx-slither.xx);
                    ytd = (foods[i].yy-slither.yy);
                    
                    dist = Math.sqrt(xtd*xtd + ytd*ytd);
                    
                    //xt += Math.pow(ruokakerroin*foods[i].fw,2)*xtd/Math.pow(dist,ruokapower+1);
                    //yt += Math.pow(ruokakerroin*foods[i].fw,2)*ytd/Math.pow(dist,ruokapower+1);
                    xt += Math.pow(foods[i].gr,2)*xtd/Math.pow(dist,ruokapower+1);
                    yt += Math.pow(foods[i].gr,2)*ytd/Math.pow(dist,ruokapower+1);
                }
                        
                xtd = (grd-slither.xx);
                ytd = (grd-slither.yy);
                
                dist = Math.sqrt(xtd*xtd + ytd*ytd);
                
                xt += xtd/Math.pow(grd-dist,keskipower+1)*DNA[6];
                yt += ytd/Math.pow(grd-dist,keskipower+1)*DNA[6];
                
                xt += xtd/grd*DNA[7];
                yt += ytd/grd*DNA[7];
                
                
            }
            
            xm = xt*kerroin;
            ym = yt*kerroin;
            
            lsxm = -xm;
            lsym = -ym;
            
            if (accelerate)
            {
                setAcceleration(1);
            }
            else
            {
                setAcceleration(0);
            }
            
            //console.log("xx:" +  view_xx + "yy:" + view_yy);
            //console.log("slither.xx:" +  slither.xx + "slither.yy:" + slither.yy);
            //console.log("slither.fx:" +  slither.fx + "slither.fy:" + slither.fy);
            //console.log("fvx:" +  fvx + "fvy:" + fvy);
            //console.log("");
            
            //console.log("foods_c:" + foods_c);
            //console.log("slithers.length:" + slithers.length);
            
            //console.log("D:" + Math.sqrt(xm*xm + ym*ym));
            
            lastscore = Math.floor(150 * (fpsls[slither.sct] + slither.fam / fmlts[slither.sct] - 1) - 50) / 10;
            if (!lastscore)
            {
                lastscore = 1;
            }
            lastrank = rank;
            if (!lastrank)
            {
                lastrank = 500;
            }
        }
        else
        {
            if (!injected_dead)
            {
                injected_dead = true;
                
				/* LEARNING ALGORITHM
					PERFORMANCE EVALUATION:
						What it does: Keeps track of records and statistics.
				*/
                if(lastscore > bestscore)
                {
                    console.log("Last score: " + lastscore + "(new best)");
                    bestscore = lastscore;
                    
                    BESTSCORE = bestscore;
                }
                else
                {
                    console.log("Last score: " + lastscore + " Best: " + bestscore);
                }
                
                if (lastrank<bestrank)
                {
                    console.log("Last rank: " + lastrank + "(new best)");
                    bestrank = lastrank;
                    
                    BESTRANK = bestrank;
                }
                else
                {
                    console.log("Last rank: " + lastrank + " Best: " + bestrank);
                }
                
                if (testingdna>0)
                {
                    TESTSCORE = lastscore/(lastrank+1);

                }
                else
                {
                    REALSCORE = (REALSCORE+lastscore/lastrank)/2;
                }
                lastscore = 0;

                // Reasons of death analysis (still to fix)
                if (slither && (slither.xx < 50 || slither.xx > grd-50 || 
                                slither.yy < 50 || slither.yy > grd-50)) {
                    borderDeaths++;
                    lastDeathType = 'border';
                    console.log("💀 BORDER death - Center DNA: ", DNA[6]?.toFixed(3));
                } else if (slither) {
                    enemyDeaths++;
                    lastDeathType = 'enemy';
                    console.log("💀 ENEMY death - Fear DNA: ", DNA[2]?.toFixed(3));
                } else {
                    unknowDeaths++;
                    lastDeathType = 'unknown';
                    console.log("💀 UNKNOWN REASON death");
                }

				/* DNA EVOLUTION:
					What it does: Improves the bot's "genes":
						Keeps strategies that work
						Randomly changes parameters to test new strategies
						Natural selection - only keeps beneficial changes
				*/
                for (var key in DNA)
                {        
                    if (TESTSCORE > REALSCORE)
                    {
                        var mul = TESTSCORE/REALSCORE
                        REALDNA[key] = (REALDNA[key] + TESTDNA[key]*mul)/(1+mul);
                        REALDNA[key] = Math.round(REALDNA[key]*precision)/precision;
                    }

                    if (testingdna<0)
                    {
                        TESTDNA[key] = REALDNA[key] + REALDNA[key]*(Math.random() - Math.random())*learnrate;
                        TESTDNA[key] = Math.round(TESTDNA[key]*precision)/precision;
                    }
                }
                
                savedna();

                testingdna = -testingdna;

                if (testingdna>0)
                {
                    DNA = TESTDNA.slice();
                }
                else
                {
                    DNA = REALDNA.slice();
                }
                //console.log("DNA = [" + DNA + "];");
                
                setTimeout(connect, 3000);
                //console.log("Reconnecting");
            }
        }
    }
}

var injectbot = function() {
    if (typeof(redraw) != "undefined")
    {
        oldredraw = redraw;

        redraw = function() {
            INJECTED();
            oldredraw();
        }
        console.log("injected");
        
        /* After injection, print the parameters read from local storage (previous experience) */
        console.log("=== BOT INJECTION CHECK ===");
        console.log("Current DNA:", DNA);
        console.log("Safety:", DNA[0]);
        console.log("Aggression:", DNA[1]);
        console.log("Enemies fear:", DNA[2]);
        console.log("Dangers attention:", DNA[3]);
        console.log("Attack distance:", DNA[4]);
        console.log("Escape distance:", DNA[5]);
        console.log("Center bias:", DNA[6]);
        console.log("Secondary center:", DNA[7]);
        /* placeholders/reserved
        console.log("gene:", DNA[8]);
        console.log("gene:", DNA[9]);
        console.log("gene:", DNA[10]);
        console.log("gene:", DNA[11]);
        console.log("gene:", DNA[12]);
        */
        console.log("Saved DNA:", JSON.parse(localStorage["REALDNA"] || "[]"));
        console.log("Bot active:", EnableBot);
        console.log("Testing DNA:", testingdna);
        console.log("========================");

        console.log("🤖 === BOT STATUS ===");
        console.log("🧬 DNA:", DNA?.map(d => d.toFixed(2)) || "Non caricato");
        console.log("💾 Saved DNA:", JSON.parse(localStorage["REALDNA"] || "[]"));
        console.log("🎯 Score:", BESTSCORE, "| Rank:", BESTRANK);
        console.log("⚡ Bot active:", EnableBot);
        console.log("🔬 Testing mode:", testingdna);
        console.log("📊 Loaded variables:", 
            DNA ? "✅" : "❌", 
            EnableBot !== undefined ? "✅" : "❌",
            testingdna !== undefined ? "✅" : "❌"
        );
        console.log("e = enable/disable bot");
        console.log("c = show status");
        console.log("v = status panel");
        console.log("======================");
        
        window.onmousemove = null;
    }
    else
    {
        setTimeout(injectbot, 1000);
        console.log("retrying")
    }
}
injectbot();