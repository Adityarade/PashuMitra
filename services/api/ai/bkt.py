"""
Adaptive Learning Engine (Bayesian Knowledge Tracing & Spaced Repetition)
Updates student concept mastery probabilities and dynamically adjusts micro-quiz difficulty.
"""
from typing import Dict, Any, List

class BayesianKnowledgeTracer:
    """
    Standard Bayesian Knowledge Tracing (BKT) implementation.
    Parameters:
    - P(L0): Initial mastery probability (default: 0.3)
    - P(T): Transition probability (probability of learning concept: 0.15)
    - P(G): Guess probability (probability of guessing correct: 0.20)
    - P(S): Slip probability (probability of making mistake despite knowing: 0.10)
    """
    def __init__(self, p_l0: float = 0.30, p_t: float = 0.15, p_g: float = 0.20, p_s: float = 0.10):
        self.p_l0 = p_l0
        self.p_t = p_t
        self.p_g = p_g
        self.p_s = p_s

    def update_mastery(self, prior_mastery: float, is_correct: bool) -> float:
        """
        Updates mastery posterior probability given an answer response.
        """
        if is_correct:
            p_correct = prior_mastery * (1.0 - self.p_s) + (1.0 - prior_mastery) * self.p_g
            p_learned_given_obs = (prior_mastery * (1.0 - self.p_s)) / p_correct
        else:
            p_incorrect = prior_mastery * self.p_s + (1.0 - prior_mastery) * (1.0 - self.p_g)
            p_learned_given_obs = (prior_mastery * self.p_s) / p_incorrect

        # Add learning transition probability
        next_mastery = p_learned_given_obs + (1.0 - p_learned_given_obs) * self.p_t
        return round(min(0.99, max(0.01, next_mastery)), 3)

    def select_next_difficulty(self, current_mastery: float) -> str:
        """
        Selects next adaptive question difficulty based on mastery level.
        """
        if current_mastery < 0.45:
            return "easy"
        elif current_mastery < 0.75:
            return "medium"
        else:
            return "hard"

# Singleton engine instance
bkt_engine = BayesianKnowledgeTracer()

def process_quiz_response(
    student_id: str,
    concept_tag: str,
    prior_mastery: float,
    is_correct: bool,
    response_time_seconds: float
) -> Dict[str, Any]:
    """
    Calculates updated mastery and suggests next step.
    """
    updated_mastery = bkt_engine.update_mastery(prior_mastery, is_correct)
    next_diff = bkt_engine.select_next_difficulty(updated_mastery)
    
    status_msg = "Great progress! Your understanding is solidifying." if is_correct else "Reviewing key concept with an intuitive visual cue."
    
    return {
        "student_id": student_id,
        "concept_tag": concept_tag,
        "prior_mastery": prior_mastery,
        "is_correct": is_correct,
        "updated_mastery": updated_mastery,
        "next_recommended_difficulty": next_diff,
        "mastery_tier": "Mastered" if updated_mastery >= 0.8 else ("In Progress" if updated_mastery >= 0.5 else "Needs Practice"),
        "feedback": status_msg
    }
