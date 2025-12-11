import React, { useState } from "react";
import "./GiftFinder.css";
import giftsData from "../../data/gifts.json";

const GiftFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [suggestedGifts, setSuggestedGifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: "ageGroup",
      question: "Quel est leur groupe d’âge?",
      type: "single",
      options: [
        {
          text: "18-25",
          value: "youngAdult",
          keywords: ["trendy", "tech", "modern"],
        },
        {
          text: "26-40",
          value: "adult",
          keywords: ["practical", "quality", "professional"],
        },
        {
          text: "41-60",
          value: "middleAged",
          keywords: ["luxury", "experience", "comfort"],
        },
        {
          text: "60+",
          value: "senior",
          keywords: ["sentimental", "comfort", "practical"],
        },
      ],
    },
    {
      id: "interests",
      question: "Quels sont leurs principaux intérêts ?",
      type: "multiple",
      options: [
        {
          text: "Music & Audio",
          value: "music",
          keywords: ["music", "audio", "entertainment"],
        },
        {
          text: "Lecture et écriture",
          value: "reading",
          keywords: ["books", "writing", "learning"],
        },
        {
          text: "Fitness & Wellness",
          value: "fitness",
          keywords: ["fitness", "health", "wellness"],
        },
        {
          text: "Cuisine & Nourriture",
          value: "cooking",
          keywords: ["cooking", "foodie", "kitchen"],
        },
        {
          text: "technologique",
          value: "tech",
          keywords: ["tech", "gadgets", "electronics"],
        },
        {
          text: "Arts & Crafts",
          value: "creative",
          keywords: ["creative", "arts", "crafts"],
        },
      ],
    },
    {
      id: "personality",
      question: "Which best describes their personality?",
      type: "single",
      options: [
        {
          text: "Pratique & Organisé",
          value: "practical",
          keywords: ["practical", "organized", "useful"],
        },
        {
          text: "Créatif & Artistique",
          value: "creative",
          keywords: ["creative", "artistic", "unique"],
        },
        {
          text: "Aventureux & Actif",
          value: "adventurous",
          keywords: ["adventure", "outdoor", "active"],
        },
        {
          text: "Relaxed & Homebody",
          value: "relaxed",
          keywords: ["comfort", "relaxation", "home"],
        },
      ],
    },
    {
      id: "occasion",
      question: "C'est pour quelle occasion ?",
      type: "single",
      options: [
        {
          text: "Birthday",
          value: "birthday",
          keywords: ["celebration", "personal", "special"],
        },
        {
          text: "Holiday",
          value: "holiday",
          keywords: ["festive", "traditional", "family"],
        },
        {
          text: "Anniversary",
          value: "anniversary",
          keywords: ["romantic", "sentimental", "keepsake"],
        },
        {
          text: "juste parce que",
          value: "casual",
          keywords: ["thoughtful", "practical", "everyday"],
        },
      ],
    },
    {
      id: "budget",
      question: "Quelle est votre budget ?",
      type: "single",
      options: [
        {
          text: "moins de 50€",
          value: "budget",
          keywords: ["affordable", "creative", "practical"],
        },
        {
          text: "€50 - €150",
          value: "midRange",
          keywords: ["quality", "premium", "worthwhile"],
        },
        {
          text: "€150+",
          value: "luxury",
          keywords: ["luxury", "premium", "highQuality"],
        },
      ],
    },
  ];

  const handleAnswer = (questionId, value, keywords) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value, keywords },
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateGiftSuggestions();
    }
  };

  const generateGiftSuggestions = () => {
    setLoading(true);

    // Collect all keywords from answers
    const allKeywords = Object.values(answers).flatMap(
      (answer) => answer.keywords
    );

    // Find gifts that match keywords
    const matchedGifts = giftsData.products
      .filter((product) => {
        const matchScore = product.keywords.filter((keyword) =>
          allKeywords.includes(keyword)
        ).length;
        return matchScore > 0;
      })
      .sort((a, b) => {
        const scoreA = a.keywords.filter((keyword) =>
          allKeywords.includes(keyword)
        ).length;
        const scoreB = b.keywords.filter((keyword) =>
          allKeywords.includes(keyword)
        ).length;
        return scoreB - scoreA;
      })
      .slice(0, 6); // Top 6 matches

    setTimeout(() => {
      setSuggestedGifts(matchedGifts);
      setLoading(false);
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setSuggestedGifts([]);
  };

  if (suggestedGifts.length > 0) {
    return (
      <div className="gift-finder results-view">
        <div className="results-header">
          <h2>🎁 Gift Suggestions Just For You 🎁</h2>
          <p className="subtitle">
            En fonction de vos préférences, nous avons trouvé ces cadeaux :
          </p>
        </div>

        <div className="gifts-grid">
          {suggestedGifts.map((gift) => (
            <div key={gift.id} className="gift-card">
              <div className="gift-image">
                <img src={gift.image} alt={gift.name} />
              </div>
              <div className="gift-info">
                <h3>{gift.name}</h3>
                <p className="gift-description">{gift.description}</p>
                <div className="gift-keywords">
                  {gift.keywords.map((keyword) => (
                    <span key={keyword} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="gift-footer">
                  <span className="gift-price">${gift.price.toFixed(2)}</span>
                  <button
                    className="select-btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=${gift.name}`,
                        "_blank"
                      )
                    }
                  >
                    Sélectionner un cadeau
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button onClick={restartQuiz} className="restart-btn">
            Refaire le quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="gift-finder loading">
        <div className="loading-spinner"></div>
        <h3>Trouver des cadeaux parfaits...</h3>
        <p>Analyser les préférences et rechercher</p>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="gift-finder">
      <div className="finder-header">
        <h1>🎁 Trouver le cadeau parfait 🎁</h1>
        <p className="subtitle">
          Répondez à quelques questions pour obtenir des suggestions de cadeaux
          personnalisés
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-text">
          Step {currentStep + 1} of {questions.length}
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-title">{currentQuestion.question}</h2>
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option.value}
              className="option-card"
              onClick={() =>
                handleAnswer(currentQuestion.id, option.value, option.keywords)
              }
            >
              <div className="option-content">
                <span className="option-text">{option.text}</span>
                {option.keywords && (
                  <div className="option-keywords">
                    {option.keywords.map((keyword) => (
                      <span key={keyword} className="mini-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="navigation">
        {currentStep > 0 && (
          <button
            className="nav-btn secondary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            ← Previous
          </button>
        )}
        <div className="step-indicator">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default GiftFinder;
