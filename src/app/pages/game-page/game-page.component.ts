import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  questions: any;
  constructor() { }

  ngOnInit() {
    this.questions = [
      {
        "categoryName": "400G, 600G, 800G... Game On!",
        "questions": [
          {
            "question": "My customers are saying that Acacia’s 2x600G solution, AC1200, will be available soon.How do I sell against this ? Select ALL that apply.",
            "difficulty": 0,
            "answers": [
              {
                "answer": "The AC1200 is still not planned on competitive platforms until at least 1Q2019, and Acacia has missed their date many times",
                "score": 10000,
                "isCorrect": true
              },
              {
                "answer": "Position WaveLogic 5 Extreme as being a better solution for 50GHz gridded networks.",
                "score": -30000,
                "isCorrect": false
              },
              {
                "answer": "With its strong ramp, WaveLogic Ai provides volume-based savings, allowing it to still be very competitive.",
                "score": 30000,
                "isCorrect": true
              },
              {
                "answer": "WaveLogic 5 Extreme will be available end of 2019, delivering 800G with a further leapfrog in economics and capacity.",
                "score": 20000,
                "isCorrect": true
              },
              {
                "answer": "Offer to buy lunch at the most expensive restaurant in the area.",
                "score": -20000,
                "isCorrect": false
              }
            ]
          }
        ]
      },
      {
        "categoryName": "400G, 600G, 800G... Game On!",
        "questions": [{
          "question": "My customers are saying that Acacia’s 2x600G solution, AC1200, will be available soon.How do I sell against this ? Select ALL that apply.",
          "difficulty": 0,
          "answers": [{
            "answer": "The AC1200 is still not planned on competitive platforms until at least 1Q2019, and Acacia has missed their date many times",
            "score": 10000,
            "isCorrect": true
          },
          {
            "answer": "Position WaveLogic 5 Extreme as being a better solution for 50GHz gridded networks.",
            "score": -30000,
            "isCorrect": false
          },
          {
            "answer": "With its strong ramp, WaveLogic Ai provides volume-based savings, allowing it to still be very competitive.",
            "score": 30000,
            "isCorrect": true
          },
          {
            "answer": "WaveLogic 5 Extreme will be available end of 2019, delivering 800G with a further leapfrog in economics and capacity.",
            "score": 20000,
            "isCorrect": true
          },
          {
            "answer": "Offer to buy lunch at the most expensive restaurant in the area.",
            "score": -20000,
            "isCorrect": false
          }
          ]
        }]
      },
      {
        "categoryName": "400G, 600G, 800G... Game On!",
        "questions": [{
          "question": "My customers are saying that Acacia’s 2x600G solution, AC1200, will be available soon.How do I sell against this ? Select ALL that apply.",
          "difficulty": 0,
          "answers": [{
            "answer": "The AC1200 is still not planned on competitive platforms until at least 1Q2019, and Acacia has missed their date many times",
            "score": 10000,
            "isCorrect": true
          },
          {
            "answer": "Position WaveLogic 5 Extreme as being a better solution for 50GHz gridded networks.",
            "score": -30000,
            "isCorrect": false
          },
          {
            "answer": "With its strong ramp, WaveLogic Ai provides volume-based savings, allowing it to still be very competitive.",
            "score": 30000,
            "isCorrect": true
          },
          {
            "answer": "WaveLogic 5 Extreme will be available end of 2019, delivering 800G with a further leapfrog in economics and capacity.",
            "score": 20000,
            "isCorrect": true
          },
          {
            "answer": "Offer to buy lunch at the most expensive restaurant in the area.",
            "score": -20000,
            "isCorrect": false
          }
          ]
        }]
      },
      {
        "categoryName": "400G, 600G, 800G... Game On!",
        "questions": [{
          "question": "My customers are saying that Acacia’s 2x600G solution, AC1200, will be available soon.How do I sell against this ? Select ALL that apply.",
          "difficulty": 0,
          "answers": [{
            "answer": "The AC1200 is still not planned on competitive platforms until at least 1Q2019, and Acacia has missed their date many times",
            "score": 10000,
            "isCorrect": true
          },
          {
            "answer": "Position WaveLogic 5 Extreme as being a better solution for 50GHz gridded networks.",
            "score": -30000,
            "isCorrect": false
          },
          {
            "answer": "With its strong ramp, WaveLogic Ai provides volume-based savings, allowing it to still be very competitive.",
            "score": 30000,
            "isCorrect": true
          },
          {
            "answer": "WaveLogic 5 Extreme will be available end of 2019, delivering 800G with a further leapfrog in economics and capacity.",
            "score": 20000,
            "isCorrect": true
          },
          {
            "answer": "Offer to buy lunch at the most expensive restaurant in the area.",
            "score": -20000,
            "isCorrect": false
          }
          ]
        }]
      }
    ];
  }

}
