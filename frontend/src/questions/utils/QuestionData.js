/**
 * Stores 20 example questions from Appendix 3.
 * Missing:
 * 1) Question ids (actual numbers, not for key)
 * 2) Question descriptions
 */

export const questionData = [
  {
    title: "Reverse a String",
    category: "Strings, Algorithms",
    complexity: "Easy",
    description: `Write a function that reverses a string. The input string is given as an array 
    of characters s.\n 
     
    You must do this by modifying the input array in-place with O(1) extra 
    memory\n
     
    Example 1: \n
     
    Input: s = ["h","e","l","l","o"] \n
    Output: ["o","l","l","e","h"] \n
    Example 2: \n
     
    Input: s = ["H","a","n","n","a","h"] \n
    Output: ["h","a","n","n","a","H"] \n
     
    Constraints: \n
     
    1 <= s.length <= 105\n
    s[i] is a printable ascii character.`,
  },
  {
    title: "Linked List Cycle Detection",
    category: "Data Structures, Algorithms",
    complexity: "Easy",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle 
    in it. \n
    There is a cycle in a linked list if there is some node in the list that can be 
    reached again by continuously following the next pointer. Internally, pos is 
    used to denote the index of the node that tail's next pointer is connected to. 
    Note that pos is not passed as a parameter. \n
    Return true if there is a cycle in the linked list. Otherwise, return false. \n
    Example 1: \n
    Page 14 of 28\n
    Input: head = [3,2,0,-4], pos = 1 \n
    Output: true \n
    Explanation: There is a cycle in the linked list, where the tail connects to the 
    1st node (0-indexed). \n
    Example 2: \n
    Input: head = [1,2], pos = 0 \n
    Output: true \n
    Explanation: There is a cycle in the linked list, where the tail connects to the 
    0th node. \n
    Example 3: \n
    Input: head = [1], pos = -1 \n
    Output: false \n
    Explanation: There is no cycle in the linked list. \n
    Constraints: \n
    The number of the nodes in the list is in the range [0, 104]. \n
    -10^5 <= Node.val <= 10^5 \n
    pos is -1 or a valid index in the linked-list. \n
     
    Follow up: Can you solve it using O(1) (i.e. constant) memory? `,
  },
  {
    title: "Roman to Integer",
    category: "Algorithms",
    complexity: "Easy",
    description: ` 3 Roman numerals are represented by seven different symbols: I, V, X, L, C, D 
    and M. \n
    Symbol Value \n
    I 1 \n
    V 5 \n
    X 10 \n
    L 50 \n
    C 100 \n
    D 500 \n
    M 1000 \n
    For example, 2 is written as II in Roman numeral, just two ones added 
    together. 12 is written as XII, which is simply X + II. The number 27 is written 
    as XXVII, which is XX + V + II.\n
    Roman numerals are usually written largest to smallest from left to right. 
    However, the numeral for four is not IIII. Instead, the number four is written 
    as IV. Because the one is before the five we subtract it making four. The 
    same principle applies to the number nine, which is written as IX. There are 
    six instances where subtraction is used: \n
    I can be placed before V (5) and X (10) to make 4 and 9. \n
    X can be placed before L (50) and C (100) to make 40 and 90. \n
    C can be placed before D (500) and M (1000) to make 400 and 900. \n
    Given a roman numeral, convert it to an integer. \n
     
    Example 1: \n
    Input: s = "III" \n
    Output: 3 \n
    Explanation: III = 3. \n
    Example 2: \n
    Input: s = "LVIII" \n
    Output: 58 \n
    Explanation: L = 50, V= 5, III = 3. \n
    Example 3: \n
    Input: s = "MCMXCIV" \n
    Output: 1994 \n
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4. \n
     
    Constraints: \n
    1 <= s.length <= 15 \n
    s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M'). \n
    It is guaranteed that s is a valid roman numeral in the range [1, 
    3999].`,
  },
  {
    title: "Add Binary",
    category: "Bit Manipulation, Algorithms",
    complexity: "Easy",
    description: `Given two binary strings a and b, return their sum as a binary string.\n
    Example 1: \n
    Input: a = "11", b = "1" \n
    Output: "100" \n
    Example 2: \n
    Input: a = "1010", b = "1011" \n
    Output: "10101" \n
     
    Constraints: \n
    1 <= a.length, b.length <= 104 \n
    a and b consist only of '0' or '1' characters. \n
    Each string does not contain leading zeros except for the zero itself.
    `,
  },
  {
    title: "Fibonacci Number",
    category: "Recursion, Algorithms",
    complexity: "Easy",
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the 
    Fibonacci sequence, such that each number is the sum of the two preceding 
    ones, starting from 0 and 1. That is, \n
    F(0) = 0, F(1) = 1 \n
    F(n) = F(n - 1) + F(n - 2), for n > 1. \n
    Given n, calculate F(n). \n
     
    Example 1: \n
    Input: n = 2 \n
    Output: 1 \n
    Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1. \n
    Example 2: \n
    Input: n = 3 \n
    Output: 2 \n
    Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2. \n
    Example 3: \n
    Input: n = 4 \n
    Output: 3 \n
    Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3. \n
     
    Constraints: \n
    0 <= n <= 30 `,
  },
  {
    title: "Implement Stack using Queues",
    category: "Data Structures",
    complexity: "Easy",
    description: `Implement a last-in-first-out (LIFO) stack using only two queues. The 
    implemented stack should support all the functions of a normal stack (push, 
    top, pop, and empty). \n
    Implement the MyStack class: \n
    void push(int x) Pushes element x to the top of the stack. \n
    int pop() Removes the element on the top of the stack and returns it. \n
    int top() Returns the element on the top of the stack. \n
    boolean empty() Returns true if the stack is empty, false otherwise. \n
    Notes: \n
    You must use only standard operations of a queue, which means that only 
    push to back, peek/pop from front, size and is empty operations are valid. 
    Depending on your language, the queue may not be supported natively. You 
    may simulate a queue using a list or deque (double-ended queue) as long as 
    you use only a queue's standard operations. \n
     
    Example 1: \n
    Input \n
    ["MyStack", "push", "push", "top", "pop", "empty"] \n
    [[], [1], [2], [], [], []] \n
    Output \n
    [null, null, null, 2, 2, false] \n
    Explanation \n
    MyStack myStack = new MyStack(); \n
    myStack.push(1); \n
    myStack.push(2); \n
    myStack.top(); // return 2 \n
    myStack.pop(); // return 2 \n
    myStack.empty(); // return False \n
     
    Constraints: \n
    1 <= x <= 9 \n
    At most 100 calls will be made to push, pop, top, and empty. \n
    All the calls to pop and top are valid. \n
     
    Follow-up: Can you implement the stack using only one queue? 
    `,
  },
  {
    title: "Combine Two Tables",
    category: "Databases",
    complexity: "Easy",
    description: `SQL Schema \n
    Table: Person \n
    +-------------+---------+ \n
    | Column Name | Type | \n
    +-------------+---------+ \n
    | personId | int | \n
    | lastName | varchar | \n
    | firstName | varchar | \n
    +-------------+---------+ \n
    personId is the primary key (column with unique values) for this table. 
    This table contains information about the ID of some persons and their first 
    and last names. \n
     
    Table: Address \n
    +-------------+---------+\n 
    | Column Name | Type | \n
    +-------------+---------+ \n
    | addressId | int | \n
    | personId | int | \n
    | city | varchar | \n
    | state | varchar | \n
    +-------------+---------+ \n
    addressId is the primary key (column with unique values) for this table. 
    Each row of this table contains information about the city and state of one 
    person with ID = PersonId. n\n
     
    Write a solution to report the first name, last name, city, and state of each 
    person in the Person table. If the address of a personId is not present in the 
    Address table, report null instead. \n
    Return the result table in any order. \n
    The result format is in the following example. \n
     
    Example 1: \n
    Input: \n
    Person table: \n
    +----------+----------+-----------+ \n
    | personId | lastName | firstName | \n
    +----------+----------+-----------+ \n
    | 1 | Wang | Allen | \n
    | 2 | Alice | Bob | \n
    +----------+----------+-----------+ \n
    Address table: \n
    +-----------+----------+---------------+------------+ \n
    | addressId | personId | city | state | \n
    +-----------+----------+---------------+------------+ \n
    | 1 | 2 | New York City | New York | \n
    | 2 | 3 | Leetcode | California | \n
    +-----------+----------+---------------+------------+ \n
    Output: \n
    +-----------+----------+---------------+----------+ \n
    | firstName | lastName | city | state | \n
    +-----------+----------+---------------+----------+ \n
    | Allen | Wang | Null | Null | \n
    | Bob | Alice | New York City | New York | \n
    +-----------+----------+---------------+----------+ \n
    Explanation: \n
    There is no address in the address table for the personId = 1 so we return 
    null in their city and state. \n
    addressId = 1 contains information about the address of personId = 2. `,
  },
  {
    title: "Repeated DNA Sequences",
    category: "Algorithms, Bit Manipulation",
    complexity: "Medium",
    description: `The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 
    'C', 'G', and 'T'. \n
    For example, "ACGAATTCCG" is a DNA sequence. \n
    When studying DNA, it is useful to identify repeated sequences within the 
    DNA. \n
    Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. 
    You may return the answer in any order. \n
    Example 1: \n
    Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT" \n
    Output: ["AAAAACCCCC","CCCCCAAAAA"] \n
    Example 2: \n
    Input: s = "AAAAAAAAAAAAA" \n
    Output: ["AAAAAAAAAA"] \n
     
    Constraints: \n
    1 <= s.length <= 105\n
    s[i] is either 'A', 'C', 'G', or 'T'. `,
  },
  {
    title: "Course Schedule",
    category: "Data Structures, Algorithms",
    complexity: "Medium",
    description: `There are a total of numCourses courses you have to take, labeled from 0 to 
    numCourses - 1. You are given an array prerequisites where prerequisites[i] 
    = [ai, bi] indicates that you must take course bi first if you want to take 
    course ai. \n
    For example, the pair [0, 1], indicates that to take course 0 you have to first 
    take course 1. \n
    Return true if you can finish all courses. Otherwise, return false. \n
     
    Example 1: \n
    Input: numCourses = 2, prerequisites = [[1,0]] \n
    Output: true \n
    Explanation: There are a total of 2 courses to take. \n
    To take course 1 you should have finished course 0. So it is possible. \n
    Example 2: \n
    Input: numCourses = 2, prerequisites = [[1,0],[0,1]] \n
    Output: false \n
    Explanation: There are a total of 2 courses to take. \n
    To take course 1 you should have finished course 0, and to take course 0 
    you should also have finished course 1. So it is impossible. \n
     
    Constraints: \n
    1 <= numCourses <= 2000 \n
    0 <= prerequisites.length <= 5000 \n
    prerequisites[i].length == 2 \n
    0 <= ai, bi < numCourses \n
    All the pairs prerequisites[i] are unique. `,
  },
  {
    title: "LRU Cache Design",
    category: "Data Structures",
    complexity: "Medium",
    description: `Design a data structure that follows the constraints of a Least Recently Used 
    (LRU) cache. \n
    Implement the LRUCache class: \n
    LRUCache(int capacity) Initialize the LRU cache with positive size capacity. \n
    int get(int key) Return the value of the key if the key exists, otherwise return 
    -1. \n
    void put(int key, int value) Update the value of the key if the key exists. \n
    Otherwise, add the key-value pair to the cache. If the number of keys 
    exceeds the capacity from this operation, evict the least recently used key. \n
    The functions get and put must each run in O(1) average time complexity. \n
     
    Example 1: \n
    Input \n
    ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] \n
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]] \n
    Output \n
    [null, null, null, 1, null, -1, null, -1, 3, 4] \n
    Explanation \n
    LRUCache lRUCache = new LRUCache(2); \n
    lRUCache.put(1, 1); // cache is {1=1} \n
    lRUCache.put(2, 2); // cache is {1=1, 2=2} \n
    lRUCache.get(1); // return 1 \n
    lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3} \n
    lRUCache.get(2); // returns -1 (not found) \n
    lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3} \n
    lRUCache.get(1); // return -1 (not found) \n
    lRUCache.get(3); // return 3 \n
    lRUCache.get(4); // return 4 \n
     
    Constraints: \n
    1 <= capacity <= 3000 \n
    0 <= key <= 10^4\n
    0 <= value <= 10^5\n
    At most 2 * 10^5 calls will be made to get and put. \n
    `,
  },
  {
    title: "Longest Common Subsequence",
    category: "Strings, Algorithms",
    complexity: "Medium",
    description: `Given two strings text1 and text2, return the length of their longest 
    common subsequence. If there is no common subsequence, return 0. \n
    A subsequence of a string is a new string generated from the original string 
    with some characters (can be none) deleted without changing the relative 
    order of the remaining characters. \n
    For example, "ace" is a subsequence of "abcde". \n
    A common subsequence of two strings is a subsequence that is common to 
    both strings. \n
    Example 1: \n
    Input: text1 = "abcde", text2 = "ace" \n
    Output: 3 \n
    Explanation: The longest common subsequence is "ace" and its length is 3. \n
    Example 2: \n
    Input: text1 = "abc", text2 = "abc"\n
    Output: 3 \n
    Explanation: The longest common subsequence is "abc" and its length is 3. \n
    Example 3: \n
    Input: text1 = "abc", text2 = "def" \n
    Output: 0 \n
    Explanation: There is no such common subsequence, so the result is 0. \n
     
    Constraints: \n
    1 <= text1.length, text2.length <= 1000 \n
    text1 and text2 consist of only lowercase English characters.`,
  },
  {
    title: "Rotate Image",
    category: "Arrays, Algorithms",
    complexity: "Medium",
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 
    90 degrees (clockwise). \n
    You have to rotate the image in-place, which means you have to modify the 
    input 2D matrix directly. DO NOT allocate another 2D matrix and do the 
    rotation. \n
    Example 1: \n
    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]] \n
    Output: [[7,4,1],[8,5,2],[9,6,3]] \n
    Example 2: \n
    Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] \n
    Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]] \n
    Constraints: \n
    n == matrix.length == matrix[i].length \n
    1 <= n <= 20 \n
    -1000 <= matrix[i][j] <= 1000 `,
  },
  {
    title: "Airplane Seat Assignment Probability",
    category: "Brainteaser",
    complexity: "Medium",
    description: `n passengers board an airplane with exactly n seats. The first passenger has 
    lost the ticket and picks a seat randomly. But after that, the rest of the 
    passengers will: \n
    Take their own seat if it is still available, and \n
    Pick other seats randomly when they find their seat occupied \n
    Return the probability that the nth person gets his own seat. \n
    Example 1: \n
    Input: n = 1 \n
    Output: 1.00000 \n
    Explanation: The first person can only get the first seat. \n
    Example 2: \n
    Input: n = 2 \n
    Output: 0.50000 \n
    Explanation: The second person has a probability of 0.5 to get the second 
    seat (when first person gets the first seat). \n
     
    Constraints: \n
    1 <= n <= 10^5`,
  },
  {
    title: "Validate Binary Search Tree",
    category: "Data Structures, Algorithms",
    complexity: "Medium",
    description: `Given the root of a binary tree, determine if it is a valid binary search tree 
    (BST). \n
    A valid BST is defined as follows: \n
     The left subtree of a node contains only nodes with keys less than 
    the node's key. \n
     The right subtree of a node contains only nodes with keys greater 
    than the node's key. \n
     Both the left and right subtrees must also be binary search trees. \n
    Example 1: \n
    Input: root = [2,1,3] \n
    Output: true \n
    Example 2: \n
    Input: root = [5,1,4,null,null,3,6]\n 
    Output: false \n
    Explanation: The root node's value is 5 but its right child's value is 4. \n
    Constraints: \n
    The number of nodes in the tree is in the range [1, 104
    ]. \n
    -231 <= Node.val <= 231 - 1 `,
  },
  {
    title: "Sliding Window Maximum",
    category: "Arrays, Algorithms",
    complexity: "Hard",
    description: `You are given an array of integers nums, there is a sliding window of size k 
    which is moving from the very left of the array to the very right. You can 
    only see the k numbers in the window. Each time the sliding window moves 
    right by one position. \n
    Return the max sliding window. \n
     
    Example 1: \n
    Input: nums = [1,3,-1,-3,5,3,6,7], k = 3 \n
    Output: [3,3,5,5,6,7] \n
    Explanation: \n
    Window position Max \n
    --------------- ----- \n
    [1 3 -1] -3 5 3 6 7 3 \n
     1 [3 -1 -3] 5 3 6 7 3 \n
     1 3 [-1 -3 5] 3 6 7 5 \n
     1 3 -1 [-3 5 3] 6 7 5 \n
     1 3 -1 -3 [5 3 6] 7 6 \n
     1 3 -1 -3 5 [3 6 7] 7 \n
    Example 2: \n
    Input: nums = [1], k = 1\n 
    Output: [1] \n
     
    Constraints: \n
    1 <= nums.length <= 10^5
    -10^4 <= nums[i] <= 10^4\n
    1 <= k <= nums.length`,
  },
  {
    title: "N-Queen Problem",
    category: "Algorithms",
    complexity: "Hard",
    description: `The n-queens puzzle is the problem of placing n queens on an n x n 
    chessboard such that no two queens attack each other. \n
     
    Given an integer n, return all distinct solutions to the n-queens puzzle. You 
    may return the answer in any order. \n
     
    Each solution contains a distinct board configuration of the n-queens' 
    placement, where 'Q' and '.' both indicate a queen and an empty space, 
    respectively. \n
    Example 1: \n
    Input: n = 4 \n
    Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] \n
    Explanation: There exist two distinct solutions to the 4-queens puzzle as 
    shown above \n
    Example 2: \n
    Input: n = 1 \n
    Output: [["Q"]] \n
    Constraints: \n
    1 <= n <= 9`,
  },
  {
    title: "Serialize and Deserialize a Binary Tree",
    category: "Data Structures, Algorithms",
    complexity: "Hard",
    description: `Serialization is the process of converting a data structure or object into a 
    sequence of bits so that it can be stored in a file or memory buffer, or 
    transmitted across a network connection link to be reconstructed later in 
    the same or another computer environment. \n
    Design an algorithm to serialize and deserialize a binary tree. There is no 
    restriction on how your serialization/deserialization algorithm should work. \n
    You just need to ensure that a binary tree can be serialized to a string and 
    this string can be deserialized to the original tree structure. \n
    Clarification: The input/output format is the same as how LeetCode 
    serializes a binary tree. You do not necessarily need to follow this format, so 
    please be creative and come up with different approaches yourself. \n
    Example 1: \n
    Input: root = [1,2,3,null,null,4,5] \n
    Output: [1,2,3,null,null,4,5] \n
    Example 2: \n
    Input: root = [] \n
    Output: [] \n
    Constraints: \n
    The number of nodes in the tree is in the range [0, 104
    ]. \n
    -1000 <= Node.val <= 1000`,
  },
  {
    title: "Wildcard Matching",
    category: "Strings, Algorithms",
    complexity: "Hard",
    description: `Given an input string (s) and a pattern (p), implement wildcard pattern 
    matching with support for '?' and '*' where: \n
    '?' Matches any single character. \n
    '*' Matches any sequence of characters (including the empty 
    sequence). \n
    The matching should cover the entire input string (not partial). \n
    Example 1: \n
    Input: s = "aa", p = "a" \n
    Output: false \n
    Explanation: "a" does not match the entire string "aa". \n
    Example 2: \n
    Input: s = "aa", p = "*" \n
    Output: true \n
    Explanation: '*' matches any sequence. \n
    Example 3: \n
    Input: s = "cb", p = "?a" \n
    Output: false \n
    Explanation: '?' matches 'c', but the second letter is 'a', which does not 
    match 'b'. \n
     
    Constraints: \n
    0 <= s.length, p.length <= 2000 \n
    s contains only lowercase English letters.\n 
    p contains only lowercase English letters, '?' or '*'. `,
  },
  {
    title: "Chalkboard XOR Game",
    category: "Brainteaser",
    complexity: "Hard",
    description: `You are given an array of integers nums represents the numbers written on 
    a chalkboard. \n
    Alice and Bob take turns erasing exactly one number from the chalkboard, 
    with Alice starting first. If erasing a number causes the bitwise XOR of all the 
    elements of the chalkboard to become 0, then that player loses. The bitwise 
    XOR of one element is that element itself, and the bitwise XOR of no 
    elements is 0. \n
    Also, if any player starts their turn with the bitwise XOR of all the elements 
    of the chalkboard equal to 0, then that player wins. \n
    Return true if and only if Alice wins the game, assuming both players play 
    optimally. \n
    Example 1: \n
    Input: nums = [1,1,2] \n
    Output: false \n
    Explanation: \n
    Alice has two choices: erase 1 or erase 2. \n
    If she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the 
    elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any 
    element he wants, because Alice will be the one to erase the last element 
    and she will lose. \n
    If Alice erases 2 first, now nums become [1, 1]. The bitwise XOR of all the 
    elements of the chalkboard is 1 XOR 1 = 0. Alice will lose. \n
    Example 2: \n
    Input: nums = [0,1] \n
    Output: true \n
    Example 3: \n
    Input: nums = [1,2,3] \n
    Output: true \n
    Constraints: \n
    1 <= nums.length <= 1000 \n
    0 <= nums[i] < 2^16`,
  },
  {
    title: "Trips and Users",
    category: "Databases",
    complexity: "Hard",
    description: `SQL Schema \n
    Pandas Schema \n
    Table: Trips \n
    +-------------+----------+ \n
    | Column Name | Type | \n
    +-------------+----------+ \n
    | id | int | \n
    | client_id | int | \n
    | driver_id | int | \n
    | city_id | int | \n
    | status | enum | \n
    | request_at | date | \n
    +-------------+----------+ 
    id is the primary key (column with unique values) for this table. \n
    The table holds all taxi trips. Each trip has a unique id, while client_id and 
    driver_id are foreign keys to the users_id at the Users table. \n
    Status is an ENUM (category) type of ('completed', 'cancelled_by_driver', 
    'cancelled_by_client'). \n
     
    Table: Users \n
    +-------------+----------+ \n
    | Column Name | Type | \n
    +-------------+----------+ \n
    | users_id | int | \n
    | banned | enum | \n
    | role | enum | \n
    +-------------+----------+ \n
    users_id is the primary key (column with unique values) for this table. 
    The table holds all users. Each user has a unique users_id, and role is an 
    ENUM type of ('client', 'driver', 'partner'). \n
    banned is an ENUM (category) type of ('Yes', 'No'). \n
     
    The cancellation rate is computed by dividing the number of canceled (by 
    client or driver) requests with unbanned users by the total number of 
    requests with unbanned users on that day. \n
    Write a solution to find the cancellation rate of requests with unbanned 
    users (both client and driver must not be banned) each day between "2013-
    10-01" and "2013-10-03". Round Cancellation Rate to two decimal points. \n
    Return the result table in any order. \n
    The result format is in the following example. \n
     
    Example 1: \n
    Input: \n
    Trips table: \n
    +----+-----------+-----------+---------+---------------------+------------+ \n
    | id | client_id | driver_id | city_id | status | request_at | \n
    +----+-----------+-----------+---------+---------------------+------------+ \n
    | 1 | 1 | 10 | 1 | completed | 2013-10-01 | \n
    | 2 | 2 | 11 | 1 | cancelled_by_driver | 2013-10-01 | \n
    | 3 | 3 | 12 | 6 | completed | 2013-10-01 | \n
    | 4 | 4 | 13 | 6 | cancelled_by_client | 2013-10-01 | \n
    | 5 | 1 | 10 | 1 | completed | 2013-10-02 | \n
    | 6 | 2 | 11 | 6 | completed | 2013-10-02 | \n
    | 7 | 3 | 12 | 6 | completed | 2013-10-02 | \n
    | 8 | 2 | 12 | 12 | completed | 2013-10-03 | \n
    | 9 | 3 | 10 | 12 | completed | 2013-10-03 | \n
    | 10 | 4 | 13 | 12 | cancelled_by_driver | 2013-10-03 | \n
    +----+-----------+-----------+---------+---------------------+------------+ \n
    Users table: \n
    +----------+--------+--------+ \n
    | users_id | banned | role | \n
    +----------+--------+--------+ \n
    | 1 | No | client | \n
    | 2 | Yes | client | \n
    | 3 | No | client | \n
    | 4 | No | client | \n
    | 10 | No | driver | \n
    | 11 | No | driver | \n
    | 12 | No | driver | \n
    | 13 | No | driver | \n
    +----------+--------+--------+ \n
    Output: \n
    +------------+-------------------+ \n
    | Day | Cancellation Rate | \n
    +------------+-------------------+ \n
    | 2013-10-01 | 0.33 | \n
    | 2013-10-02 | 0.00 | \n
    | 2013-10-03 | 0.50 | \n
    +------------+-------------------+ \n
    Explanation: \n
    On 2013-10-01: \n
     - There were 4 requests in total, 2 of which were canceled. \n
     - However, the request with Id=2 was made by a banned client (User_Id=2), \n
    so it is ignored in the calculation. \n
     - Hence there are 3 unbanned requests in total, 1 of which was canceled. \n
     - The Cancellation Rate is (1 / 3) = 0.33 \n
    On 2013-10-02: \n
     - There were 3 requests in total, 0 of which were canceled. \n
     - The request with Id=6 was made by a banned client, so it is ignored. \n
     - Hence there are 2 unbanned requests in total, 0 of which were canceled. \n
     - The Cancellation Rate is (0 / 2) = 0.00 \n
    On 2013-10-03: \n
     - There were 3 requests in total, 1 of which was canceled. \n
     - The request with Id=8 was made by a banned client, so it is ignored. \n
     - Hence there are 2 unbanned request in total, 1 of which were canceled. \n
     - The Cancellation Rate is (1 / 2) = 0.50`,
  },
];
