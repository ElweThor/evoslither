# 🧬 Genetic Algorithm in EvoSlither

## Overview
EvoSlither implements a real-time genetic algorithm that evolves playing strategies through natural selection. Each bot "life" represents a generation, with successful traits being preserved and poor ones discarded.

## 🧬 The DNA Structure

The bot's behavior is controlled by 8 evolvable parameters:

| Parameter | DNA Index | Description | Default |
|-----------|-----------|-------------|---------|
| **Safety Distance** | 0 | Minimum distance from enemies | 90 |
| **Prey Aggression** | 1 | Attraction to prey targets | 5 |
| **Enemy Fear** | 2 | Repulsion from live snakes | 544 |
| **Danger Awareness** | 3 | Repulsion from snake bodies | 200 |
| **Attack Distance** | 4 | Range to start chasing prey | 500 |
| **Escape Distance** | 5 | Range to flee from threats | 70 |
| **Center Seeking** | 6 | Attraction to map center | 2.0 |
| **Center Pull** | 7 | Secondary center attraction | 0.1 |

## 🔄 The Evolution Cycle

### 1. **Evaluation**
```javascript
TESTSCORE = lastscore / (lastrank + 1);
```

Each generation is scored based on performance: higher scores and better rankings yield better fitness.

### 2. **Selection**
```javascript
if (TESTSCORE > REALSCORE) {
    REALDNA[key] = (REALDNA[key] + TESTDNA[key] * mul) / (1 + mul);
}
```

Successful DNA parameters are weighted more heavily in the next generation.

### 3. **Mutation**
```javascript
TESTDNA[key] = REALDNA[key] + REALDNA[key] * (Math.random() - Math.random()) * learnrate;
```

Random mutations introduce new traits, with `learnrate` (0.3) controlling variation intensity.

### 4. **Inheritance**
```javascript
DNA = TESTDNA.slice();  // Testing new DNA
// OR
DNA = REALDNA.slice();  // Reverting to proven DNA
```

The bot alternates between testing new DNA and using proven strategies.

## 🎯 Behavioral Mechanics

### **Movement Calculation**
The bot calculates movement vectors from three forces:

1. **Prey Attraction** - Pull toward food and smaller snakes
```javascript
xt += xtd / Math.pow(dist, preypower + 1) * DNA[1];
yt += ytd / Math.pow(dist, preypower + 1) * DNA[1];
```

2. **Threat Repulsion** - Push away from larger snakes and obstacles  
```javascript
xt += -xtd / Math.pow(dist, vihollispower + 1) * DNA[2];
yt += -ytd / Math.pow(dist, vihollispower + 1) * DNA[2];
```

3. **Center Seeking** - Gentle pull toward map center for safety
```javascript
xt += xtd / Math.pow(grd - dist, keskipower + 1) * DNA[6];
yt += ytd / Math.pow(grd - dist, keskipower + 1) * DNA[6];
```

### **Acceleration Logic**
- **Chase Mode**: Accelerate when prey is within attack distance
- **Escape Mode**: Accelerate when threats are within escape distance

## 📊 Learning Progression

### **Early Generations (1-10)**
- Random, exploratory behavior
- High mortality rate
- Rapid parameter fluctuation

### **Mid Generations (10-50)**
- Basic survival instincts emerge
- Balanced center/edge behavior
- Improved threat recognition

### **Advanced Generations (50+)**
- Strategic hunting patterns
- Efficient pathfinding
- Adaptive risk management

## 🧪 Experimental Features

### **Death Analytics**
Tracks causes of death to understand evolutionary pressures:
- **Border Deaths**: Indicate poor center-seeking behavior
- **Enemy Deaths**: Suggest inadequate threat detection
- **Unknown Deaths**: Highlight areas for algorithm improvement

### **Real-time Monitoring**
The status panel shows:
- Current DNA parameters
- Evolutionary progress
- Performance metrics
- Death cause statistics

## 🔍 Research Implications

This implementation demonstrates:
- **Emergent Behavior**: Complex strategies from simple rules
- **Adaptive Learning**: Environment-specific optimization
- **Evolutionary Stability**: Balance between exploration and exploitation

## 🚀 Future Enhancements

Potential algorithm improvements:
- Multi-objective optimization (score vs survival time)
- Environmental adaptation (different server strategies)
- Cooperative evolution (multiple bots learning together)

---

*"Evolution is a process of constant branching and expansion."* - Stephen Jay Gould