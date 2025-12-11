import React, { useState } from "react";
import "./GiftFinder.css";
import giftsData from "../../data/gifts.json";

const GiftFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [suggestedGifts, setSuggestedGifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      id: "step1",
      title: "👤 Profil Général",
      questions: [
        {
          id: "budget",
          question: "Quel est votre budget ? (Min - Max)",
          type: "budget",
          minLabel: "Minimum €",
          maxLabel: "Maximum €",
          minValue: 5,
          maxValue: 100,
        },
        {
          id: "recipient",
          question: "Pour qui est-ce ?",
          type: "multiple",
          options: [
            { text: "Ami(e)", value: "friend", keywords: ["friendship", "casual", "fun"] },
            { text: "Conjoint(e)", value: "partner", keywords: ["romantic", "intimate", "special"] },
            { text: "Grand-parent", value: "grandparent", keywords: ["sentimental", "classic", "comfort"] },
            { text: "Parent", value: "parent", keywords: ["practical", "useful", "quality"] },
            { text: "Enfant", value: "child", keywords: ["fun", "educational", "safe"] },
            { text: "Collègue", value: "colleague", keywords: ["professional", "useful", "practical"] },
            { text: "Frère/Soeur", value: "sibling", keywords: ["fun", "personal", "meaningful"] },
            { text: "Autre", value: "other", keywords: ["thoughtful", "unique", "special"] },
          ],
        },
        {
          id: "age",
          question: "Âge : ",
          type: "slider",
          min: 5,
          max: 100,
          unit: " ans",
        },
        {
          id: "gender",
          question: "Genre (Optionnel)",
          type: "single",
          options: [
            { text: "Femme", value: "female", keywords: ["feminine"] },
            { text: "Homme", value: "male", keywords: ["masculine"] },
            { text: "Neutre", value: "neutral", keywords: ["unisex"] },
          ],
        },
        {
          id: "occasion",
          question: "L'occasion ?",
          type: "single",
          isSelect: true,
          options: [
            { text: "Sélectionnez une occasion", value: "", keywords: [] },
            { text: "Anniversaire", value: "birthday", keywords: ["celebration", "personal"] },
            { text: "Noël", value: "christmas", keywords: ["festive", "family"] },
            { text: "Saint Valentin", value: "valentines", keywords: ["romantic", "sentimental"] },
            { text: "Mariage", value: "wedding", keywords: ["celebration", "special"] },
            { text: "Naissance", value: "birth", keywords: ["new", "baby"] },
            { text: "Retraite", value: "retirement", keywords: ["milestone", "relaxation"] },
          ],
        },
      ],
    },
    {
      id: "step2",
      title: "❤️ Style & Personnalité",
      questions: [
        {
          id: "traits",
          question: "Traits de caractère principaux",
          type: "multiple",
          options: [
            { text: "Calme", value: "calm", keywords: ["peaceful", "relaxation"] },
            { text: "Créatif", value: "creative", keywords: ["creative", "artistic"] },
            { text: "Aventurier", value: "adventurous", keywords: ["adventure", "outdoor"] },
            { text: "Drôle", value: "funny", keywords: ["humor", "fun"] },
            { text: "Ambitieux", value: "ambitious", keywords: ["success", "professional"] },
            { text: "Geek", value: "geek", keywords: ["tech", "gaming"] },
            { text: "Rêveur", value: "dreamer", keywords: ["imaginative", "artistic"] },
            { text: "Sportif", value: "sporty", keywords: ["fitness", "active"] },
            { text: "Gourmand", value: "foodie", keywords: ["cooking", "food"] },
            { text: "Curieux", value: "curious", keywords: ["learning", "exploration"] },
          ],
        },
        {
          id: "preference",
          question: "Préférence Matériel vs Expérience ?",
          type: "single",
          options: [
            { text: "Objet", value: "object", keywords: ["tangible", "keepsake"] },
            { text: "Expérience", value: "experience", keywords: ["memory", "adventure"] },
            { text: "Les deux", value: "both", keywords: ["balanced", "thoughtful"] },
          ],
        },
        {
          id: "lifestyle",
          question: "Style de vie ?",
          type: "single",
          options: [
            { text: "Casanier", value: "homebody", keywords: ["comfort", "home"] },
            { text: "Actif / Dehors", value: "active", keywords: ["outdoor", "adventure"] },
            { text: "Équilibré", value: "balanced", keywords: ["balanced", "varied"] },
          ],
        },
        {
          id: "eco",
          question: "Sensibilité Écolo / Made in France ?",
          type: "checkbox",
          text: "Prioriser l'éthique et le durable.",
          keywords: ["eco", "sustainable", "ethical"],
        },
      ],
    },
    {
      id: "step3",
      title: "🧠 Centres d'intérêt",
      type: "multiple",
      question: "Sélectionnez tout ce qui lui correspond.",
      options: [
        { text: "Cuisine & Gastronomie", value: "cooking", keywords: ["cooking", "food", "culinary"] },
        { text: "Bien-être & Relaxation", value: "wellness", keywords: ["wellness", "relaxation", "health"] },
        { text: "Sport & Plein air", value: "sports", keywords: ["sports", "outdoor", "fitness"] },
        { text: "Lecture & Culture", value: "reading", keywords: ["books", "culture", "intellectual"] },
        { text: "Tech & Gadgets", value: "tech", keywords: ["tech", "gadgets", "electronics"] },
        { text: "Maison & Déco", value: "home", keywords: ["home", "decor", "interior"] },
        { text: "Mode & Accessoires", value: "fashion", keywords: ["fashion", "style", "accessories"] },
        { text: "Jeux & Divertissement", value: "gaming", keywords: ["gaming", "fun", "entertainment"] },
        { text: "Musique", value: "music", keywords: ["music", "audio", "entertainment"] },
        { text: "Art & Artisanat", value: "arts", keywords: ["creative", "arts", "crafts"] },
        { text: "Animaux", value: "animals", keywords: ["pets", "animals", "nature"] },
        { text: "Voyages", value: "travel", keywords: ["travel", "adventure", "exploration"] },
      ],
    },
    {
      id: "step4",
      title: "🔍 Derniers détails",
      questions: [
        {
          id: "constraints",
          question: "Avez-vous des contraintes particulières ?",
          type: "multiple-checkbox",
          options: [
            { text: "Éviter les cadeaux encombrants", value: "avoid_bulky", keywords: ["compact", "small"] },
            { text: "Possède déjà beaucoup de choses", value: "already_has", keywords: ["minimalist", "unique"] },
          ],
        },
      ],
    },
    {
      id: "step5",
      title: "⏰ Contexte Pratique",
      questions: [
        {
          id: "urgency",
          question: "C'est une urgence ? (Livraison < 48h)",
          type: "checkbox",
          text: "Si coché, nous ne proposerons que des produits livrables très rapidement ou des e-cartes/bons.",
          keywords: ["fast", "urgent"],
        },
      ],
      finalMessage: "Tout est prêt ? Gleeka va générer des idées magiques pour vous.",
      buttonText: "✨ Révéler les cadeaux",
    },
  ];

  const handleAnswer = (questionId, value, keywords = []) => {
    const newAnswers = {
      ...answers,
      [questionId]: { value, keywords: Array.isArray(keywords) ? keywords : [keywords] },
    };
    setAnswers(newAnswers);
  };

  const handleMultipleAnswer = (questionId, value, keywords) => {
    const current = answers[questionId]?.value || [];
    const isSelected = current.includes(value);

    const newValues = isSelected
      ? current.filter((v) => v !== value)
      : [...current, value];

    const allKeywords = newValues.flatMap((v) => {
      const option = steps
        .flatMap((s) => s.questions || [s])
        .flatMap((q) => q.options || [])
        .find((o) => o.value === v);
      return option ? option.keywords : [];
    });

    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value: newValues, keywords: allKeywords },
    }));
  };

  const handleBudgetChange = (min, max) => {
    setAnswers((prev) => ({
      ...prev,
      budget: { value: { min, max }, keywords: ["budget"] },
    }));
  };

  const handleSliderChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      age: { value, keywords: ["age"] },
    }));
  };

  const handleCheckboxChange = (questionId, keywords) => {
    const isChecked = answers[questionId]?.value || false;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value: !isChecked, keywords: !isChecked ? keywords : [] },
    }));
  };

  // Validation for Step 1
  const isStep1Valid = () => {
    const recipient = answers.recipient?.value;
    const hasRecipient = Array.isArray(recipient) ? recipient.length > 0 : !!recipient;

    const occasion = answers.occasion?.value;
    const hasOccasion = occasion && occasion !== "";

    return hasRecipient && hasOccasion;
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateGiftSuggestions();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateGiftSuggestions = () => {
    setLoading(true);

    const allKeywords = Object.values(answers)
      .flatMap((answer) => answer.keywords || [])
      .filter(Boolean);

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
      .slice(0, 6);

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
          <h2>🎁 Suggestions de cadeaux 🎁</h2>
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
                    Découvrir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button onClick={restartQuiz} className="restart-btn">
            ↻ Refaire le quiz
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

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isStep3 = currentStepData.id === "step3";
  const isValid = currentStep === 0 ? isStep1Valid() : true;

  return (
    <div className="gift-finder">

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-text">
          Etape {currentStep + 1} sur {steps.length}
        </div>
      </div>

      <div className="question-card">
        <div className="step-header">
          <h2>{currentStepData.title}</h2>
        </div>

        {isStep3 ? (
          <>
            <p className="step-description">{currentStepData.question}</p>
            <div className="options-grid grid-3">
              {currentStepData.options.map((option) => (
                <button
                  key={option.value}
                  className={`option-card ${answers[currentStepData.id]?.value?.includes(option.value)
                    ? "active"
                    : ""
                    }`}
                  onClick={() =>
                    handleMultipleAnswer(
                      currentStepData.id,
                      option.value,
                      option.keywords
                    )
                  }
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {currentStepData.questions.map((question, idx) => (
              <div key={question.id} className="question-section">
                {question.type === "budget" ? (
                  <div className="budget-inputs">
                    <label>{question.question}</label>
                    <div className="budget-row">
                      <div className="budget-field">
                        <label>{question.minLabel}</label>
                        <input
                          type="number"
                          defaultValue={5}
                          onChange={(e) => {
                            const min = parseInt(e.target.value);
                            const max = answers.budget?.value?.max || 100;
                            handleBudgetChange(min, max);
                          }}
                        />
                      </div>
                      <div className="budget-field">
                        <label>{question.maxLabel}</label>
                        <input
                          type="number"
                          defaultValue={100}
                          onChange={(e) => {
                            const max = parseInt(e.target.value);
                            const min = answers.budget?.value?.min || 5;
                            handleBudgetChange(min, max);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : question.type === "slider" ? (
                  <div className="slider-input">
                    <div className="label-row">
                      <label>{question.question}</label>
                      <span className="slider-value-display">
                        {answers.age?.value || 30}{question.unit}
                      </span>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        defaultValue={30}
                        onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                        style={{
                          backgroundSize: `${((answers.age?.value || 30) - question.min) * 100 / (question.max - question.min)
                            }% 100%`
                        }}
                      />
                    </div>
                  </div>
                ) : question.type === "multiple" ? (
                  <div className="multiple-section">
                    <label>{question.question}</label>
                    <div className="options-grid">
                      {question.options.map((option) => (
                        <button
                          key={option.value}
                          className={`option-card ${question.id === 'recipient'
                            ? (answers[question.id]?.value === option.value ? "active" : "")
                            : (answers[question.id]?.value?.includes(option.value) ? "active" : "")
                            }`}
                          onClick={() => {
                            if (question.id === 'recipient') {
                              handleAnswer(question.id, option.value, option.keywords);
                            } else {
                              handleMultipleAnswer(
                                question.id,
                                option.value,
                                option.keywords
                              );
                            }
                          }}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : question.type === "single" && question.isSelect ? (
                  <div className="select-section">
                    <label>{question.question}</label>
                    <select
                      onChange={(e) =>
                        handleAnswer(question.id, e.target.value, [])
                      }
                    >
                      {question.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : question.type === "single" ? (
                  <div className="single-section">
                    <label>{question.question}</label>
                    <div className={`radio-group ${question.id === 'gender' ? 'segmented-control' : ''}`}>
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`radio-label ${answers[question.id]?.value === option.value ? 'active' : ''}`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={answers[question.id]?.value === option.value}
                            onChange={() =>
                              handleAnswer(question.id, option.value, option.keywords)
                            }
                          />
                          <span>{option.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : question.type === "checkbox" ? (
                  <div className={`checkbox-section ${question.id === 'eco' ? 'eco-section' : question.id === 'urgency' ? 'urgency-section' : ''}`}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckboxChange(question.id, question.keywords)
                        }
                      />
                      <span className="checkbox-text">
                        <strong>{question.question}</strong>
                        <p>{question.text}</p>
                      </span>
                    </label>
                  </div>
                ) : question.type === "multiple-checkbox" ? (
                  <div className="multiple-checkbox-section">
                    <label>{question.question}</label>
                    {question.options.map((option) => (
                      <label key={option.value} className="checkbox-label">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleMultipleAnswer(
                              question.id,
                              option.value,
                              option.keywords
                            )
                          }
                        />
                        <span>{option.text}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {isLastStep && currentStepData.finalMessage && (
              <div className="final-message">
                <p>{currentStepData.finalMessage}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="navigation">
        {currentStep > 0 && (
          <button className="nav-btn secondary" onClick={goToPreviousStep}>
            ← Retour
          </button>
        )}
        <button
          className="nav-btn primary"
          onClick={goToNextStep}
          disabled={!isValid}
        >
          {isLastStep ? steps[currentStep].buttonText : "Suivant →"}
        </button>
      </div>
    </div>
  );
};

export default GiftFinder;
