from django.test import TestCase
from bot_core.text_generation import TextGeneration

class TextGenerationTestCase(TestCase):
    def test_initial_conversation(self):
        worker = TextGeneration()
        chat_history = []
        question = "Hi, how are you?"
        response = worker.generate_response(question, chat_history)
        self.assertIsInstance(response, str)
        self.assertNotIn("Hmm, I'm not sure.", response)
        
    def test_with_conversation_history(self):
        worker = TextGeneration()
        chat_history = [("Where have you worked?", "I have worked on a charity organization's Wordpress site with custom plugins and theme configurations since May 2021. Prior to that, I have been working on a company website developed in Laravel since Sep 2019. There, I was responsible for maintaining and refactoring existing site code as well as developing new features.")]
        question = "What experience do you have with PHP?"
        response = worker.generate_response(question, chat_history)
        chat_history.append((question, response))
        self.assertIsInstance(response, str)
        self.assertNotIn("Hmm, I'm not sure.", response)
        next_question = "Where else have you worked?"
        response = worker.generate_response(next_question, chat_history)
        self.assertIsInstance(response, str)
        self.assertNotIn("Hmm, I'm not sure.", response)
                
    def test_no_context_question(self):
        worker = TextGeneration()
        chat_history = []
        question = "How long have you been a lumberjack?"
        response = worker.generate_response(question, chat_history)
        self.assertIsInstance(response, str)
        self.assertIn("Hmm, I'm not sure.", response)